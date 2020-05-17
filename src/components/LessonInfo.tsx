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
  PROP_IS_ADD_EDIT_MODE,
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
  PROP_CREATED_AT,
  PROP_CREATED_BY,
  PROP_SOURCE_SQUARE,
  PROP_TARGET_SQUARE,
  PROP_PIECE,
  PROP_FEN_STRING,
  PROP_FROM,
  PROP_TO,
} from '../constants';

// Imported types
import {
  PutNotificationAction,
  PutNotificationActionPayload as NotificationData,
  Move,
  CheckMove,
  LessonData,
} from '../types';
import { PureComponent, ClipboardEvent, ChangeEvent } from 'react';
import { ChessInstance } from 'chess.js';

// Local types
export interface Props {
  onPutNotification(notificationData: NotificationData): PutNotificationAction;
}

export interface State {
  [PROP_IS_ADD_EDIT_MODE]: boolean;
  [PROP_NEW_CHECK_MOVE]: CheckMove | null;
  [PROP_ACTUAL_BOARD_POSITION]: string;
  [PROP_LESSON_DATA]: LessonData;
}

export default class LessonInfo extends PureComponent<Props, State> {
  private game: ChessInstance;

  constructor(props: any) {
    super(props);

    this.game = new (require('chess.js'))();

    this.state = {
      [PROP_IS_ADD_EDIT_MODE]: true,
      [PROP_NEW_CHECK_MOVE]: null,
      [PROP_ACTUAL_BOARD_POSITION]: '',
      [PROP_LESSON_DATA]: {
        [PROP_TITLE]: '',
        [PROP_DESCRIPTION]: '',
        [PROP_INITIAL_BOARD_POSITION]: '',
        [PROP_CHECK_MOVES]: [],
        [PROP_CREATED_BY]: 111,
        [PROP_CREATED_AT]: null,
      },
    };
  }

  public componentDidMount() {
    const { lessonData } = this.state;
    const fenStr = this.game.fen();

    this.setState({
      [PROP_ACTUAL_BOARD_POSITION]: fenStr,
      [PROP_LESSON_DATA]: {
        ...lessonData,
        [PROP_INITIAL_BOARD_POSITION]: fenStr,
      },
    });
  }

  private renderLessonTitleInput = (): JSX.Element => {
    const { isAddEditMode } = this.state;

    return (
      <Form.Group controlId="lesson.title" className={'w-100'}>
        <Form.Label className={'pl-3'}>Title:</Form.Label>
        <Col className={'d-inline-block'}>
          <Form.Control
            className={'text-truncate'}
            size="sm"
            type="text"
            placeholder="Enter the lesson title"
            readOnly={!isAddEditMode}
            maxLength={150}
          />
        </Col>
      </Form.Group>
    );
  };

  private renderChessBoard = (): JSX.Element => {
    const {
      isAddEditMode,
      actualBoardPosition,
      newCheckMove,
      [PROP_LESSON_DATA]: { checkMoves },
    } = this.state;

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
        {isAddEditMode && <h4>{actualStatus}</h4>}
        <ChessBoard
          key={uniqueId}
          position={actualBoardPosition}
          sparePieces={isAddEditMode}
          width={isAddEditMode ? 350 : 450}
          getPosition={(position: any) => console.log('Position', position)}
          onDrop={this.onDropFigure}
        />
      </Row>
    );
  };

  private renderChessBoardStateInput = (): JSX.Element | null => {
    const {
      isAddEditMode,
      newCheckMove,
      [PROP_LESSON_DATA]: { initialBoardPosition, checkMoves },
    } = this.state;

    return isAddEditMode ? (
      <Row className={'mt-3'}>
        <Form.Group controlId="lesson.description" className={'w-100 d-flex'}>
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
          </Col>
        </Form.Group>
      </Row>
    ) : null;
  };

  private renderLessonDescriptionInput = (): JSX.Element => {
    const { isAddEditMode } = this.state;

    return (
      <Row className={'mt-3'}>
        <Form.Group controlId="lesson.description" className={'w-100'}>
          <Form.Label className={'pl-3 text-truncate'}>Description:</Form.Label>
          <Col className={'d-inline-block'}>
            <Form.Control
              as="textarea"
              rows={3}
              maxLength={500}
              readOnly={!isAddEditMode}
            />
          </Col>
        </Form.Group>
      </Row>
    );
  };

  private renderAddCheckMoveInputSection = (): JSX.Element | null => {
    const { newCheckMove, isAddEditMode } = this.state;

    const { sourceSquare = '', targetSquare = '', piece = '' } =
      newCheckMove || {};

    return isAddEditMode ? (
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
    } = this.state;

    return (
      <ListGroup className={'mt-5'}>
        <h4 className={'pl-4'}>Check Moves:</h4>
        {checkMoves.map(({ sourceSquare, targetSquare, piece }, index) => {
          return (
            <ListGroup.Item
              key={index}
              className={'d-flex justify-content-between'}
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
    const { isAddEditMode } = this.state;

    return (
      <Row className={'mt-3 pl-3'}>
        {isAddEditMode ? (
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

  private renderPublishButton = (): JSX.Element => {
    return (
      <Row className={'mt-3 pr-3 d-flex justify-content-end'}>
        <Button variant="success">Publish</Button>
      </Row>
    );
  };

  private onDropFigure = ({
    sourceSquare,
    targetSquare,
    piece,
  }: Move): void => {
    const { lessonData, newCheckMove } = this.state;
    const { onPutNotification } = this.props;
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

    if (!!checkMoves.length && !newCheckMove) {
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

    let move = this.game.move({
      [PROP_FROM]: sourceSquare,
      [PROP_TO]: targetSquare,
    });

    if (move) {
      const fenStr = this.game.fen();

      if (!newCheckMove) {
        this.setState({
          [PROP_ACTUAL_BOARD_POSITION]: fenStr,
          [PROP_LESSON_DATA]: {
            ...lessonData,
            [PROP_INITIAL_BOARD_POSITION]: fenStr,
          },
        });
      } else {
        this.setState({
          [PROP_ACTUAL_BOARD_POSITION]: fenStr,
          [PROP_NEW_CHECK_MOVE]: { sourceSquare, targetSquare, piece, fenStr },
        });
      }
    } else {
      onPutNotification({
        [PROP_NOTIFICATION_HEADER]: 'Invalid Chess Move!',
        [PROP_NOTIFICATION_BODY]: 'Please try again or make another one!',
        [PROP_FORMATTED_DATE_TIME]: moment().format('DD/MM/YYYY HH:mm'),
        [PROP_DELAY_TIME]: 4000,
        [PROP_WITH_AUTO_HIDE]: true,
      });
    }
  };

  private onResetChessBoardState = (): void => {
    const { lessonData } = this.state;

    this.game.reset();
    const newFenStr = this.game.fen();

    this.setState({
      [PROP_ACTUAL_BOARD_POSITION]: newFenStr,
      [PROP_NEW_CHECK_MOVE]: null,
      [PROP_LESSON_DATA]: {
        ...lessonData,
        [PROP_INITIAL_BOARD_POSITION]: newFenStr,
        [PROP_CHECK_MOVES]: [],
      },
    });
  };

  private onSetChessBoardState = (
    event: ClipboardEvent<HTMLInputElement>
  ): void => {
    const { lessonData } = this.state;

    const inputFenStr = event.clipboardData.getData('Text');
    const validatedFenStr = this.game.validate_fen(inputFenStr);

    if (validatedFenStr.valid) {
      this.setState({
        [PROP_ACTUAL_BOARD_POSITION]: inputFenStr,
        [PROP_LESSON_DATA]: {
          ...lessonData,
          [PROP_INITIAL_BOARD_POSITION]: inputFenStr,
          [PROP_CHECK_MOVES]: [],
        },
      });

      this.game.load(inputFenStr);
    } else {
      const { onPutNotification } = this.props;

      onPutNotification({
        [PROP_NOTIFICATION_HEADER]: 'FEN String Input Error',
        [PROP_NOTIFICATION_BODY]: validatedFenStr.error,
        [PROP_FORMATTED_DATE_TIME]: moment().format('DD/MM/YYYY HH:mm'),
        [PROP_DELAY_TIME]: 4000,
        [PROP_WITH_AUTO_HIDE]: true,
      });
    }
  };

  private onSetNewCheckMove = (isUnset?: boolean): void => {
    const { newCheckMove } = this.state;

    this.setState(() => {
      let previousBoardPosition = '';

      if (
        isUnset &&
        !!Object.values((newCheckMove || {}) as CheckMove).length
      ) {
        const {
          [PROP_LESSON_DATA]: { checkMoves, initialBoardPosition },
        } = this.state;

        if (!!checkMoves.length) {
          previousBoardPosition =
            checkMoves[checkMoves.length - 1][PROP_FEN_STRING];
        } else {
          previousBoardPosition = initialBoardPosition;
        }
      }

      previousBoardPosition && this.game.load(previousBoardPosition);

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

    const { lessonData } = this.state;
    const { checkMoves } = lessonData;

    this.setState({
      [PROP_LESSON_DATA]: {
        ...lessonData,
        [PROP_CHECK_MOVES]: [
          ...checkMoves,
          this.state.newCheckMove,
        ] as CheckMove[],
      },
    });

    this.onSetNewCheckMove();
  };

  private onDiscardLastCheckMove = (): void => {
    const { lessonData } = this.state;
    const { checkMoves } = lessonData;
    const { initialBoardPosition } = lessonData;

    const updatedCheckMoves =
      checkMoves.length === 1 ? [] : checkMoves.slice(0, -1);
    const lastCheckMoveIndex = updatedCheckMoves.length - 1;
    const newActualBoardPosition =
      lastCheckMoveIndex < 0
        ? initialBoardPosition
        : updatedCheckMoves[lastCheckMoveIndex][PROP_FEN_STRING];

    this.game.load(newActualBoardPosition);

    this.setState({
      [PROP_ACTUAL_BOARD_POSITION]: newActualBoardPosition,
      [PROP_LESSON_DATA]: {
        ...lessonData,
        [PROP_CHECK_MOVES]: updatedCheckMoves,
      },
    });
  };

  render() {
    return (
      <Form className={'p-3 overflow-auto'}>
        <Row>
          <Col>
            {this.renderLessonTitleInput()}
            {this.renderChessBoard()}
            {this.renderChessBoardStateInput()}
            {this.renderLessonDescriptionInput()}
            {this.renderLessonInstructionsInput()}
            {this.renderPublishButton()}
          </Col>
          {this.renderAddCheckMoveInputSection()}
        </Row>
      </Form>
    );
  }
}
