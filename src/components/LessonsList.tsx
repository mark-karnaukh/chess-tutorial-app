// Libs
import React from 'react';

// Components
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

// Constants
import {
  STATE_LESSONS,
  PROP_SELECTED_LESSON_ID,
  PROP_OPERATION_TYPE,
  PROP_USER_TYPE,
  PROP_SEARCH_TERM,
  TYPE_TEACHER,
  PROP_TITLE,
} from '../constants';

// Imported types
import { PureComponent, ChangeEvent } from 'react';
import {
  LessonData,
  OperationType,
  SelectLessonAction,
  DeleteLessonAction,
} from '../types';

interface Props {
  [PROP_SELECTED_LESSON_ID]: string | null;
  [PROP_USER_TYPE]: string;
  [STATE_LESSONS]: Array<LessonData>;
  [PROP_OPERATION_TYPE]: OperationType | null;
  onCreateLesson(): void;
  onSelectLesson(lessonId: string): SelectLessonAction;
  onDeleteLesson(): DeleteLessonAction;
  onEditLesson(): void;
}

export interface State {
  [PROP_SEARCH_TERM]: string;
}

export default class LessonsList extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { [PROP_SEARCH_TERM]: '' };
  }

  private onSearchForLesson = (event: ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value || '';

    this.setState({ [PROP_SEARCH_TERM]: value });
  };

  render() {
    const {
      userType,
      lessons,
      selectedLessonId,
      operationType,
      onCreateLesson,
      onSelectLesson,
      onDeleteLesson,
      onEditLesson,
    } = this.props;

    const { searchTerm } = this.state;

    const isNoLessonsAvailable = !lessons.length;
    const filteredLessons = !searchTerm
      ? lessons
      : lessons.filter((lesson) =>
          lesson[PROP_TITLE].toLowerCase().includes(searchTerm.toLowerCase())
        );

    return (
      <Row className={'flex-column flex-nowrap h-100 lessons-list-wrapper'}>
        <Col className={'pt-3 search-bar'}>
          <Form inline>
            <InputGroup className={'w-100'}>
              <Form.Control
                className={'text-truncate'}
                type="text"
                placeholder={
                  !isNoLessonsAvailable
                    ? 'Search For Lesson...'
                    : 'No Lessons To Search...'
                }
                onChange={this.onSearchForLesson}
                disabled={isNoLessonsAvailable}
                aria-describedby="inputGroupSearch"
                required
              />
              <InputGroup.Append>
                <InputGroup.Text id="inputGroupSearch">
                  <span role={'img'} aria-label="search-icon">
                    🔎
                  </span>
                </InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </Form>
        </Col>
        <Col className={'pt-3 overflow-auto lessons-list'}>
          <ListGroup as="ul">
            {filteredLessons.map((lesson) => {
              const { title, id } = lesson;

              return (
                <ListGroup.Item
                  as="li"
                  active={selectedLessonId === id || false}
                  disabled={!!operationType}
                  onClick={() => {
                    !operationType && onSelectLesson(id as string);
                  }}
                  key={id as string}
                  //   variant="dark"
                >
                  {title}
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Col>
        {userType === TYPE_TEACHER ? (
          <Col
            className={`pt-3 pb-3 d-flex ${
              isNoLessonsAvailable
                ? 'justify-content-start'
                : 'justify-content-around'
            } align-items-center`}
          >
            <Button
              variant="success"
              className={'lessons-button'}
              onClick={onCreateLesson}
              disabled={!!operationType}
            >
              Create
              <span className={'ml-2'} role={'img'} aria-label="add-icon">
                ➕
              </span>
            </Button>
            {!isNoLessonsAvailable && (
              <React.Fragment>
                <Button
                  variant="warning"
                  className={'lessons-button'}
                  disabled={!!operationType}
                  onClick={onEditLesson}
                >
                  Edit
                  <span className={'ml-2'} role={'img'} aria-label="edit-icon">
                    ✏️
                  </span>
                </Button>
                <Button
                  variant="danger"
                  className={'lessons-button'}
                  disabled={!!operationType}
                  onClick={onDeleteLesson}
                >
                  Delete
                  <span
                    className={'ml-2'}
                    role={'img'}
                    aria-label="delete-icon"
                  >
                    🗑️
                  </span>
                </Button>
              </React.Fragment>
            )}
          </Col>
        ) : null}
      </Row>
    );
  }
}
