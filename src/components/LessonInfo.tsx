// Libs
import React from 'react';
import moment from 'moment';

// Components
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import ChessBoard from 'chessboardjsx';

// Constants
import {
  PROP_NEW_CHECK_MOVE,
  PROP_ACTUAL_BOARD_POSITION,
  PROP_LESSON_DATA,
  PROP_NOTIFICATION_HEADER,
  PROP_NOTIFICATION_BODY,
  PROP_WITH_AUTO_HIDE,
  PROP_FORMATTED_DATE_TIME,
  PROP_DELAY_TIME,
  PROP_TITLE,
  PROP_DESCRIPTION,
  PROP_INITIAL_BOARD_POSITION,
  PROP_CHECK_MOVES,
  PROP_SOURCE_SQUARE,
  PROP_TARGET_SQUARE,
  PROP_PIECE,
  PROP_FEN_STRING,
  PROP_FROM,
  PROP_TO,
  PROP_OPERATION_TYPE,
  PROP_IS_VALIDATED,
  PROP_USER_TYPE,
  PROP_CHESS_MOVES_COUNT,
} from '../constants';

// Imported types
import {
  PutNotificationAction,
  PutNotificationActionPayload as NotificationData,
  DiscardOperationAction,
  UpdateOperationDataAction,
  UpdateOperationDataActionPayload as OperationData,
  SubmitLessonDataAction,
  Move,
  CheckMove,
  LessonData,
  OperationType,
} from '../types';
import { PureComponent, ClipboardEvent, ChangeEvent, FormEvent } from 'react';
import { ChessInstance, Piece, PieceType } from 'chess.js';

// Local types
export interface Props {
  [PROP_LESSON_DATA]: LessonData;
  [PROP_OPERATION_TYPE]: OperationType | null;
  [PROP_USER_TYPE]: string;
  onPutNotification(notificationData: NotificationData): PutNotificationAction;
  onDiscardOperation(): DiscardOperationAction;
  onUpdateOperationData(updates: OperationData): UpdateOperationDataAction;
  onSubmitLessonData(): SubmitLessonDataAction;
}

export interface State {
  [PROP_NEW_CHECK_MOVE]: CheckMove | null;
  [PROP_ACTUAL_BOARD_POSITION]: string;
  [PROP_IS_VALIDATED]: boolean;
  [PROP_CHESS_MOVES_COUNT]: number;
}

export default class LessonInfo extends PureComponent<Props, State> {
  private game: ChessInstance | null;

  constructor(props: any) {
    super(props);
    this.game = null;

    this.state = {
      [PROP_NEW_CHECK_MOVE]: null,
      [PROP_ACTUAL_BOARD_POSITION]: '',
      [PROP_IS_VALIDATED]: false,
      [PROP_CHESS_MOVES_COUNT]: 0,
    };
  }

  public componentDidMount() {
    this.initializeChessGameState();
  }

  public componentDidUpdate(prevProps: Readonly<Props>) {
    const {
      operationType: currentOperationType,
      lessonData: { id: currentLessonId },
    } = this.props;

    const {
      operationType: previousOperationType,
      lessonData: { id: previousLessonId },
    } = prevProps;

    const isSelectedLessonChanged = previousLessonId !== currentLessonId;
    const isOperationTypeChanged =
      previousOperationType !== currentOperationType;

    if (isSelectedLessonChanged || isOperationTypeChanged) {
      this.resetChessGameState();
      this.initializeChessGameState();
    }
  }

  private renderLessonTitleInput = (): JSX.Element => {
    const {
      operationType,
      lessonData: { title },
    } = this.props;

    return (
      <Form.Group controlId="lesson.title" className={'w-100'}>
        <Form.Label className={'pl-3'}>Title:</Form.Label>
        <Col className={'d-inline-block'}>
          <Form.Control
            className={'text-truncate'}
            size="sm"
            type="text"
            placeholder="Enter the lesson title"
            readOnly={!operationType}
            maxLength={150}
            required={true}
            value={title}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              const newValue = event.target.value || '';
              const { onUpdateOperationData } = this.props;

              onUpdateOperationData({
                [PROP_TITLE]: newValue,
              } as OperationData);
            }}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please enter the lesson title!
          </Form.Control.Feedback>
        </Col>
      </Form.Group>
    );
  };

  private renderChessBoard = (): JSX.Element => {
    const { actualBoardPosition, newCheckMove } = this.state;

    const {
      operationType,
      [PROP_LESSON_DATA]: { checkMoves },
    } = this.props;

    // Generating a unique id to be set for component instance key attribute to fix issue with re-rendering
    const uniqueId =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);

    const actualStatus =
      !!newCheckMove || !!checkMoves.length
        ? 'Adding check moves...'
        : 'Setting an initial board state...';

    return (
      <Row className={'d-flex justify-content-center mt-3'}>
        {operationType && <h4>{actualStatus}</h4>}
        <ChessBoard
          key={uniqueId}
          position={actualBoardPosition}
          sparePieces={!!operationType}
          allowDrag={this.allowDrag}
          width={operationType ? 350 : 450}
          getPosition={(position: any) => console.log('Position', position)}
          onDrop={this.onDropFigure}
        />
      </Row>
    );
  };

  private renderChessBoardStateInput = (): JSX.Element | null => {
    const { newCheckMove } = this.state;

    const {
      operationType,
      [PROP_LESSON_DATA]: { initialBoardPosition, checkMoves },
    } = this.props;

    return operationType ? (
      <Row className={'mt-3'}>
        <Form.Group
          controlId="lesson.chessBoardStateInput"
          className={'w-100 d-flex'}
        >
          <Col lg={8} md={8} sm={8}>
            <Form.Control
              onPaste={this.onSetChessBoardState}
              placeholder="FEN String (Board State)"
              size="sm"
              readOnly={false}
              disabled={!!newCheckMove || !!checkMoves.length}
              value={initialBoardPosition}
            />
            <Form.Text className="text-muted">
              Paste a FEN-string or move figures manually to set initial board
              state.
            </Form.Text>
          </Col>
          <Col lg={4} md={4} sm={4}>
            <Button
              variant="primary"
              size={'sm'}
              onClick={this.onResetChessBoardState}
            >
              Reset board
            </Button>
            <Button
              variant="primary"
              size={'sm'}
              onClick={this.onClearChessBoardState}
            >
              Clear board
            </Button>
          </Col>
        </Form.Group>
      </Row>
    ) : null;
  };

  private renderLessonDescriptionInput = (): JSX.Element => {
    const {
      operationType,
      lessonData: { description },
    } = this.props;

    return (
      <Row className={'mt-3'}>
        <Form.Group controlId="lesson.description" className={'w-100'}>
          <Form.Label className={'pl-3 text-truncate'}>Description:</Form.Label>
          <Col className={'d-inline-block'}>
            <Form.Control
              as="textarea"
              rows={3}
              maxLength={500}
              readOnly={!operationType}
              value={description}
              required={true}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                const newValue = event.target.value || '';
                const { onUpdateOperationData } = this.props;

                onUpdateOperationData({
                  [PROP_DESCRIPTION]: newValue,
                } as OperationData);
              }}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Please enter the lesson description!
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
      </Row>
    );
  };

  private renderAddCheckMoveInputSection = (): JSX.Element | null => {
    const { newCheckMove } = this.state;
    const { operationType } = this.props;

    const { sourceSquare = '', targetSquare = '', piece = '' } =
      newCheckMove || {};

    return operationType ? (
      <Col>
        <Row className={'mt-4 ml-4'}>
          <Button
            disabled={!!newCheckMove}
            onClick={() => this.onSetNewCheckMove()}
            variant="primary"
          >
            Set New Check Move
          </Button>
        </Row>
        {!!newCheckMove ? (
          <Row className={'mt-5 mr-3 ml-3'}>
            <Col lg={8} md={8} sm={8}>
              <Form.Control
                className={'mt-1'}
                placeholder="Source Square"
                size="sm"
                readOnly={false}
                required={true}
                onChange={({
                  target: { value },
                }: ChangeEvent<HTMLInputElement>) =>
                  this.onUpdateNewMoveData(PROP_SOURCE_SQUARE, value)
                }
                value={sourceSquare}
              />
              <Form.Control
                className={'mt-1'}
                placeholder="Target Square"
                size="sm"
                readOnly={false}
                required={true}
                onChange={({
                  target: { value },
                }: ChangeEvent<HTMLInputElement>) =>
                  this.onUpdateNewMoveData(PROP_TARGET_SQUARE, value)
                }
                value={targetSquare}
              />
              <Form.Control
                className={'mt-1'}
                placeholder="Piece"
                size="sm"
                readOnly={false}
                required={true}
                onChange={({
                  target: { value },
                }: ChangeEvent<HTMLInputElement>) =>
                  this.onUpdateNewMoveData(PROP_PIECE, value)
                }
                value={piece}
              />
              <Form.Text className="text-muted">
                Put the required data or move figure manually on the board to
                set a new check move.
              </Form.Text>
            </Col>
            <Col
              lg={4}
              md={4}
              sm={4}
              className={'d-flex flex-column justify-content-around pr-0'}
            >
              <Button
                variant="primary"
                size="sm"
                onClick={this.onAddNewCheckMove}
                className={'text-truncate'}
              >
                Add
                <span className={'ml-2'} role={'img'} aria-label="add-icon">
                  ➕
                </span>
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  this.onSetNewCheckMove(true);
                }}
                className={'text-truncate'}
              >
                Cancel
                <span className={'ml-2'} role={'img'} aria-label="cancel-icon">
                  ❌
                </span>
              </Button>
            </Col>
          </Row>
        ) : null}
        {this.renderCheckMovesList()}
      </Col>
    ) : null;
  };

  private renderCheckMovesList = (): JSX.Element => {
    const {
      [PROP_LESSON_DATA]: { checkMoves },
    } = this.props;

    return (
      <ListGroup className={'mt-5'}>
        <h4 className={'pl-4'}>Check Moves:</h4>
        {checkMoves.map(({ sourceSquare, targetSquare, piece }, index) => {
          return (
            <ListGroup.Item
              key={index}
              className={'d-flex justify-content-between ml-3'}
            >
              {`From: ${sourceSquare}, to: ${targetSquare}, piece: ${piece}`}
              {index === checkMoves.length - 1 && (
                <Button
                  variant="danger"
                  size="sm"
                  onClick={this.onDiscardLastCheckMove}
                >
                  Discard
                </Button>
              )}
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    );
  };

  private renderLessonInstructionsInput = (): JSX.Element => {
    const { operationType } = this.props;

    return (
      <Row className={'mt-3 pl-3'}>
        {operationType ? (
          <Form.File
            id="custom-file"
            label="Lesson instructions"
            // custom
            accept={'application/pdf,application/pptx'}
          />
        ) : (
          <Button variant="primary" size="sm">
            Download Instructions
          </Button>
        )}
      </Row>
    );
  };

  private renderAddEditModeButtons = (): JSX.Element | null => {
    const { onDiscardOperation, operationType } = this.props;

    return operationType ? (
      <Row className={'mt-5 pr-3 d-flex justify-content-around'}>
        <Button variant="success" type="submit">
          Publish
        </Button>
        <Button
          variant="dark"
          onClick={() => {
            onDiscardOperation();
            this.resetChessGameState();
          }}
        >
          Discard
        </Button>
      </Row>
    ) : null;
  };

  private onDropFigure = ({
    sourceSquare,
    targetSquare,
    piece,
  }: Move): void => {
    const { newCheckMove, chessMovesCount } = this.state;
    const {
      lessonData,
      operationType,
      onPutNotification,
      onUpdateOperationData,
    } = this.props;
    const { checkMoves } = lessonData;

    if (!!Object.values(newCheckMove || {}).length) {
      onPutNotification({
        [PROP_NOTIFICATION_HEADER]: 'Chess Move Failed!',
        [PROP_NOTIFICATION_BODY]: `Unable to make a new chess move. 
          Please commit your current check move or discard it.`,
        [PROP_FORMATTED_DATE_TIME]: moment().format('DD/MM/YYYY HH:mm'),
        [PROP_DELAY_TIME]: 4000,
        [PROP_WITH_AUTO_HIDE]: true,
      });

      return;
    }

    if (operationType && !!checkMoves.length && !newCheckMove) {
      onPutNotification({
        [PROP_NOTIFICATION_HEADER]: 'Chess Move Failed!',
        [PROP_NOTIFICATION_BODY]: `Please click on the "Set New Check Move" button to set a new check move or 
          discard all previous check moves to be able to set initial board state.`,
        [PROP_FORMATTED_DATE_TIME]: moment().format('DD/MM/YYYY HH:mm'),
        [PROP_DELAY_TIME]: 4000,
        [PROP_WITH_AUTO_HIDE]: true,
      });

      return;
    }

    // Convert the UI piece model to chess.js
    // piece model.
    let chessPiece : Piece = {
      color: piece[0] as 'b' | 'w',
      type: piece[1].toLowerCase() as PieceType
    };

    const removedPiece = (this.game as ChessInstance).remove(sourceSquare);
    let move = (this.game as ChessInstance).put(chessPiece, targetSquare);
    if (!move && removedPiece) {
      // put the removed chess piece back
      (this.game as ChessInstance).put(removedPiece, sourceSquare);
    }

    if (move) {
      const fenStr = (this.game as ChessInstance).fen();

      if (!operationType) {
        const { fenStr: checkMoveFenStr } = checkMoves[chessMovesCount];

        this.setState({
          [PROP_ACTUAL_BOARD_POSITION]: fenStr,
        });

        if (checkMoveFenStr !== fenStr) {
          let previousBoardPosition: string;

          if (chessMovesCount === 0) {
            previousBoardPosition = lessonData[PROP_INITIAL_BOARD_POSITION];
          } else {
            previousBoardPosition =
              checkMoves[chessMovesCount - 1][PROP_FEN_STRING];
          }

          setTimeout(() => {
            onPutNotification({
              [PROP_NOTIFICATION_HEADER]: 'Wrong Chess Move!',
              [PROP_NOTIFICATION_BODY]:
                'Please read careful the lesson description or take a look at the lesson instruction (if available).',
              [PROP_FORMATTED_DATE_TIME]: moment().format('DD/MM/YYYY HH:mm'),
              [PROP_DELAY_TIME]: 4000,
              [PROP_WITH_AUTO_HIDE]: true,
            });

            this.setState({
              [PROP_ACTUAL_BOARD_POSITION]: previousBoardPosition,
            });

            this.game?.load(previousBoardPosition);
          }, 1000);
        } else {
          const { chessMovesCount } = this.state;

          let nextMove = chessMovesCount + 1;

          setTimeout(() => {
            onPutNotification({
              [PROP_NOTIFICATION_HEADER]: 'Well done!',
              [PROP_NOTIFICATION_BODY]:
                "You're one step closer to the goal! Good job!",
              [PROP_FORMATTED_DATE_TIME]: moment().format('DD/MM/YYYY HH:mm'),
              [PROP_DELAY_TIME]: 4000,
              [PROP_WITH_AUTO_HIDE]: true,
            });

            if (this.game?.turn() === 'b' && !!checkMoves[nextMove]) {
              const { fenStr: nextBoardPosition } = checkMoves[nextMove];

              this.setState({
                [PROP_ACTUAL_BOARD_POSITION]: nextBoardPosition,
              });

              this.game?.load(nextBoardPosition);

              nextMove = nextMove + 1;
            }

            this.setState({ [PROP_CHESS_MOVES_COUNT]: nextMove });

            if (nextMove === checkMoves.length) {
              setTimeout(() => {
                onPutNotification({
                  [PROP_NOTIFICATION_HEADER]: 'Congrats!',
                  [PROP_NOTIFICATION_BODY]:
                    'You are done with this lesson! Go and try another one!',
                  [PROP_FORMATTED_DATE_TIME]: moment().format(
                    'DD/MM/YYYY HH:mm'
                  ),
                  [PROP_DELAY_TIME]: 4000,
                  [PROP_WITH_AUTO_HIDE]: true,
                });
              }, 1000);
            }
          }, 1000);
        }

        return;
      }

      if (!newCheckMove) {
        this.setState({
          [PROP_ACTUAL_BOARD_POSITION]: fenStr,
        });

        onUpdateOperationData({
          [PROP_INITIAL_BOARD_POSITION]: fenStr,
        } as OperationData);
      } else {
        this.setState({
          [PROP_ACTUAL_BOARD_POSITION]: fenStr,
          [PROP_NEW_CHECK_MOVE]: { sourceSquare, targetSquare, piece, fenStr },
        });
      }
    } else {
      onPutNotification({
        [PROP_NOTIFICATION_HEADER]: 'Invalid Chess Move!',
        [PROP_NOTIFICATION_BODY]: `Please try again or make another one! Move a next figure from the ${
          this.game?.turn() === 'b' ? 'black' : 'white'
        } side.`,
        [PROP_FORMATTED_DATE_TIME]: moment().format('DD/MM/YYYY HH:mm'),
        [PROP_DELAY_TIME]: 4000,
        [PROP_WITH_AUTO_HIDE]: true,
      });
    }
  };

  private onResetChessBoardState = (): void => {
    this.game?.reset();
    this.updateStateFromCurrentBoard();
  };

  private onClearChessBoardState = (): void => {
    this.game?.clear();
    this.updateStateFromCurrentBoard();
  };

  private updateStateFromCurrentBoard = (): void => {
    const { onUpdateOperationData } = this.props;

    const newFenStr = (this.game as ChessInstance).fen();

    this.setState({
      [PROP_ACTUAL_BOARD_POSITION]: newFenStr,
      [PROP_NEW_CHECK_MOVE]: null,
    });

    Object.entries({
      [PROP_INITIAL_BOARD_POSITION]: newFenStr,
      [PROP_CHECK_MOVES]: [],
    }).forEach(([key, value]) =>
      onUpdateOperationData({ [key]: value } as OperationData)
    );
  };

  private onSetChessBoardState = (
    event: ClipboardEvent<HTMLInputElement>
  ): void => {
    const inputFenStr = event.clipboardData.getData('Text');
    const validatedFenStr = (this.game as ChessInstance).validate_fen(
      inputFenStr
    );
    const { onUpdateOperationData } = this.props;

    if (validatedFenStr.valid) {
      this.setState({
        [PROP_ACTUAL_BOARD_POSITION]: inputFenStr,
      });

      Object.entries({
        [PROP_INITIAL_BOARD_POSITION]: inputFenStr,
        [PROP_CHECK_MOVES]: [],
      }).forEach(([key, value]) =>
        onUpdateOperationData({ [key]: value } as OperationData)
      );

      this.game?.load(inputFenStr);
    } else {
      const { onPutNotification } = this.props;

      onPutNotification({
        [PROP_NOTIFICATION_HEADER]: 'FEN String Parsing Error!',
        [PROP_NOTIFICATION_BODY]: validatedFenStr.error,
        [PROP_FORMATTED_DATE_TIME]: moment().format('DD/MM/YYYY HH:mm'),
        [PROP_DELAY_TIME]: 4000,
        [PROP_WITH_AUTO_HIDE]: true,
      });
    }
  };

  private onSetNewCheckMove = (isUnset?: boolean): void => {
    const { newCheckMove } = this.state;
    const {
      [PROP_LESSON_DATA]: { checkMoves, initialBoardPosition },
    } = this.props;
    if (
      !isUnset &&
      !newCheckMove &&
      !checkMoves.length &&
      this.game?.turn() === 'b'
    ) {
      const { onPutNotification } = this.props;

      onPutNotification({
        [PROP_NOTIFICATION_HEADER]: 'Unable to add new check move!',
        [PROP_NOTIFICATION_BODY]:
          'Please make sure that the user (student) will start moves from the white side when setting an initial board state!',
        [PROP_FORMATTED_DATE_TIME]: moment().format('DD/MM/YYYY HH:mm'),
        [PROP_DELAY_TIME]: 4000,
        [PROP_WITH_AUTO_HIDE]: true,
      });

      return;
    }

    this.setState(() => {
      let previousBoardPosition = '';

      if (
        isUnset &&
        !!Object.values((newCheckMove || {}) as CheckMove).length
      ) {
        if (!!checkMoves.length) {
          previousBoardPosition =
            checkMoves[checkMoves.length - 1][PROP_FEN_STRING];
        } else {
          previousBoardPosition = initialBoardPosition;
        }
      }

      previousBoardPosition &&
        (this.game as ChessInstance).load(previousBoardPosition);

      return {
        [PROP_NEW_CHECK_MOVE]: (!newCheckMove ? {} : null) as CheckMove,
        ...(previousBoardPosition
          ? { [PROP_ACTUAL_BOARD_POSITION]: previousBoardPosition }
          : {}),
      } as Pick<State, 'newCheckMove' | 'actualBoardPosition'>;
    });
  };

  private onUpdateNewMoveData = (field: string, value: string): void => {
    const { newCheckMove } = this.state;

    this.setState({
      [PROP_NEW_CHECK_MOVE]: { ...newCheckMove, [field]: value } as CheckMove,
    });
  };

  private onAddNewCheckMove = () => {
    const { newCheckMove } = this.state;
    const { sourceSquare, targetSquare, piece, fenStr } = newCheckMove || {};

    if (!sourceSquare || !targetSquare || !piece) {
      const { onPutNotification } = this.props;

      onPutNotification({
        [PROP_NOTIFICATION_HEADER]: 'Add New Check Move Failed!',
        [PROP_NOTIFICATION_BODY]:
          'Please fill in all required fields before adding a new check move.',
        [PROP_FORMATTED_DATE_TIME]: moment().format('DD/MM/YYYY HH:mm'),
        [PROP_DELAY_TIME]: 4000,
        [PROP_WITH_AUTO_HIDE]: true,
      });

      return;
    }

    if (!fenStr) {
      this.onDropFigure({ sourceSquare, targetSquare, piece });
    }

    const { lessonData, onUpdateOperationData } = this.props;
    const { checkMoves } = lessonData;

    onUpdateOperationData({
      [PROP_CHECK_MOVES]: [...checkMoves, this.state.newCheckMove],
    } as OperationData);

    this.onSetNewCheckMove();
  };

  private onDiscardLastCheckMove = (): void => {
    const { lessonData, onUpdateOperationData } = this.props;
    const { checkMoves } = lessonData;
    const { initialBoardPosition } = lessonData;

    const updatedCheckMoves =
      checkMoves.length === 1 ? [] : checkMoves.slice(0, -1);
    const lastCheckMoveIndex = updatedCheckMoves.length - 1;
    const newActualBoardPosition =
      lastCheckMoveIndex < 0
        ? initialBoardPosition
        : updatedCheckMoves[lastCheckMoveIndex][PROP_FEN_STRING];

    this.game?.load(newActualBoardPosition);

    this.setState({
      [PROP_ACTUAL_BOARD_POSITION]: newActualBoardPosition,
    });

    onUpdateOperationData({
      [PROP_CHECK_MOVES]: updatedCheckMoves,
    } as OperationData);
  };

  private onHandleSubmitData = (e: FormEvent<HTMLFormElement>) => {
    const { lessonData, onPutNotification, onSubmitLessonData } = this.props;
    const form = e.currentTarget;

    const { checkMoves } = lessonData;

    e.preventDefault();

    if (form.checkValidity() === false) {
      return this.setState({ [PROP_IS_VALIDATED]: true });
    }

    if (!checkMoves.length) {
      onPutNotification({
        [PROP_NOTIFICATION_HEADER]: 'Data Submit Error!',
        [PROP_NOTIFICATION_BODY]:
          'Please add at least one check move before submitting your changes!',
        [PROP_FORMATTED_DATE_TIME]: moment().format('DD/MM/YYYY HH:mm'),
        [PROP_DELAY_TIME]: 2000,
        [PROP_WITH_AUTO_HIDE]: true,
      });

      return;
    }

    onSubmitLessonData();
    this.resetChessGameState();
  };

  private initializeChessGameState = (): void => {
    if (!this.game) {
      const {
        onUpdateOperationData,
        operationType,
        lessonData: { initialBoardPosition, checkMoves },
      } = this.props;

      const Chess = require('chess.js');

      this.game = !!initialBoardPosition
        ? new Chess(initialBoardPosition)
        : new Chess();

      const fenStr = (this.game as ChessInstance).fen();

      this.setState({
        [PROP_ACTUAL_BOARD_POSITION]: fenStr,
      });

      !initialBoardPosition &&
        onUpdateOperationData({
          [PROP_INITIAL_BOARD_POSITION]: fenStr,
        } as OperationData);

      if (!!checkMoves.length && !!operationType) {
        const newFenStr = checkMoves[checkMoves.length - 1][PROP_FEN_STRING];

        this.game?.load(newFenStr);

        this.setState({
          [PROP_ACTUAL_BOARD_POSITION]: newFenStr,
        });
      }
    }
  };

  private resetChessGameState = (): void => {
    this.game = null;

    this.setState({
      [PROP_ACTUAL_BOARD_POSITION]: '',
      [PROP_CHESS_MOVES_COUNT]: 0,
    });
  };

  private allowDrag = () => {
    const {
      lessonData: { checkMoves },
      operationType,
    } = this.props;

    const { chessMovesCount } = this.state;

    if (!operationType) {
      return chessMovesCount !== checkMoves.length;
    }

    return true;
  };

  render() {
    const { isValidated } = this.state;

    return (
      <Form
        className={'p-3 overflow-auto'}
        noValidate
        validated={isValidated}
        onSubmit={this.onHandleSubmitData}
      >
        <Row>
          <Col>
            {this.renderLessonTitleInput()}
            {this.renderChessBoard()}
            {this.renderChessBoardStateInput()}
            {this.renderLessonDescriptionInput()}
            {this.renderLessonInstructionsInput()}
            {this.renderAddEditModeButtons()}
          </Col>
          {this.renderAddCheckMoveInputSection()}
        </Row>
      </Form>
    );
  }
}
