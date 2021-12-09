import LabelListItem from "../../atoms/LabelsListItem/LabelListItem";
import { Button } from "react-bootstrap";
import { MdAddCircle } from "react-icons/md";

const Labels = () => {
  const labels = [
    {
      pk: 1,
      name: "frontend",
      description: "very nice",
      color: "primary",
    },
    {
      pk: 2,
      name: "backend",
      description: "important label",
      color: "danger",
    },
    {
      pk: 3,
      name: "devops",
      description: "must do",
      color: "success",
    },
  ];
  return (
    <>
      <Button style={{ marginBottom: "10px" }} variant="primary" size="sm">
        <MdAddCircle size={18} /> Add label
      </Button>
      {labels.map((labelItem) => {
        return (
          <div key={labelItem.pk}>
            <LabelListItem label={labelItem} />
          </div>
        );
      })}
    </>
  );
};

export default Labels;
