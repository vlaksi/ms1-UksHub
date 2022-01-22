import { ListGroup, Button, Modal, Form, Badge } from "react-bootstrap";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import { useState } from "react";
import {
  deleteLabel,
  updateLabel,
} from "../../../services/progresstrackapp/labelsService";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";

const IssueListItem = ({ issue }) => {
  return (
    <div>
      <ListGroup as="ol">
        <ListGroup.Item
          as="li"
          className="d-flex justify-content-between align-items-start"
        >
          <div>
            <h3>{issue.title}</h3>
          </div>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default IssueListItem;
