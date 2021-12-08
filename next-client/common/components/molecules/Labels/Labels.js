import LabelListItem from "../../atoms/LabelsListItem/LabelListItem";

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
