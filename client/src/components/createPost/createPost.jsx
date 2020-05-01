import React, { useState } from "react";
import { Card, Container, Form, Input, Button } from "reactstrap";
import { connect } from "react-redux";
import { createPost } from "../../actions/postsAction";

const CreatePost = ({ createPost }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <Container>
      <Card body style={{ border: "1px solid grey", margin: "20px 0" }}>
        <Form>
          <Input
            type="text"
            name="title"
            placeholder="Title.."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ margin: "5px 0" }}
          />
          <Input
            type="text"
            name="description"
            placeholder="Description.."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ margin: "5px 0" }}
          />
          <Button
            block
            onClick={(e) => {
              e.preventDefault();
              const obj = {
                title,
                description,
              };
              //   console.log(obj);
              createPost(obj);
              setTitle("");
              setDescription("");
            }}
          >
            Add Post
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { createPost })(CreatePost);
