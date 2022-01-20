import { ListGroup, Button, Modal, Form, Badge } from "react-bootstrap";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";

const MilestoneListItem = ({ milestone }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleDeleteModalClose = () => setShowDeleteModal(false);
  const handleShowDeleteModal = () => setShowDeleteModal(true);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  const handleClose = () => {
    setShow(false);
  };

  const [milestoneName, setMilestoneName] = useState(milestone.name);
  const handleChangingMilestoneName = (milestoneName) => {
    setMilestoneName(milestoneName);
  };

  const [milestoneDescription, setMilestoneDescription] = useState(
    milestone.description
  );
  const handleChangingMilestoneDescription = (milestoneDescription) => {
    setMilestoneDescription(milestoneDescription);
  };

  const [milestoneDate, setMilestoneDate] = useState(milestone.due_date);
  const handleChangingMilestoneDate = (milestoneDate) => {
    setMilestoneDate(milestoneDate);
  };

  const notifyDeleted = () => toast.success("Successfully deleted milestone!");
  const notifyUpdated = () => toast.success("Successfully updated milestone!");
  const notifyError = () => toast.error("Check if you entered all fields!");

  const router = useRouter();
  const { user, repository } = router.query;

  //   const deleteChosenLabel = async () => {
  //     let isSuccessfulDeleted = await deleteLabel(label.pk);
  //     if (isSuccessfulDeleted) {
  //       window.location.href = `http://localhost:3000/${user}/${repository}/labels`;
  //       notifyDeleted();
  //     }
  //   };
  //   const updateNewLabel = async () => {
  //     let isSuccessfulUpdated = await updateLabel(
  //       labelName,
  //       labelDescription,
  //       labelColor,
  //       label.pk
  //     );
  //     if (isSuccessfulUpdated) {
  //       notifyUpdated();
  //       handleClose();
  //       window.location.href = `http://localhost:3000/${user}/${repository}/labels`;
  //     } else {
  //       notifyError();
  //     }
  //   };
  return (
    <ListGroup as="ol">
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
      >
        ANa
      </ListGroup.Item>
    </ListGroup>
  );
};

export default MilestoneListItem;
