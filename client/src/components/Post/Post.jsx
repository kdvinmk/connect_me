import React, { useState } from "react";
import {
  Container,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Button,
} from "reactstrap";
import { connect } from "react-redux";
import { postComment } from "../../actions/postsAction";
import style from "./Post.module.css";

const Post = ({
  title,
  description,
  posted_at,
  comments,
  auth,
  postComment,
  post_id,
}) => {
  const [comment, setComment] = useState("");

  return (
    <div className={style.postContainer}>
      <Container>
        <Card body style={{ border: "1px solid grey", margin: "20px 0" }}>
          <CardBody>{title}</CardBody>
          <CardBody>{description}</CardBody>
          <CardBody className="text-muted">{posted_at}</CardBody>
          <CardFooter>
            <div style={{ display: "flex" }}>
              <Input
                type="text"
                name="comment"
                placeholder="Add a comment"
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
              />
              <Button
                size="sm"
                style={{ height: "40px", fontSize: "10px", margin: "0 5px" }}
                onClick={(e) => {
                  e.preventDefault();
                  const obj = {
                    comment,
                    post_id,
                  };
                  postComment(obj);
                  setComment("");
                }}
              >
                Add comment
              </Button>
            </div>
          </CardFooter>
          {comments.map((comment, index) => {
            return (
              <CardFooter key={index}>
                {comment.posted_by}
                <br />
                {comment.comment}
              </CardFooter>
            );
          })}
        </Card>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { postComment })(Post);
