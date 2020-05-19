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
  TYPE_TEACHER,
} from '../constants';

// Imported types
import { PureComponent } from 'react';
import { LessonData, OperationType, SelectLessonAction } from '../types';

interface Props {
  [PROP_SELECTED_LESSON_ID]: string | null;
  [PROP_USER_TYPE]: string;
  [STATE_LESSONS]: Array<LessonData>;
  [PROP_OPERATION_TYPE]: OperationType | null;
  onCreateLesson(): void;
  onSelectLesson(lessonId: string): SelectLessonAction;
}

export default class LessonsList extends PureComponent<Props> {
  render() {
    const {
      userType,
      lessons,
      selectedLessonId,
      operationType,
      onCreateLesson,
      onSelectLesson,
    } = this.props;

    const isNoLessonsAvailable = !lessons.length;

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
            {lessons.map((lesson) => {
              const { title, id } = lesson;

              return (
                <ListGroup.Item
                  as="li"
                  active={selectedLessonId === id || false}
                  disabled={!!operationType}
                  onClick={() => {
                    !operationType && onSelectLesson(id as string);
                  }}
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
