import LabelListItem from "../../atoms/LabelsListItem/LabelListItem";

const Labels = () => {
  const labels = [
    {
      name: "frontend",
      description: "very nice",
    },
    {
      name: "backend",
      description: "important label",
    },
    {
      name: "devops",
      description: "must do",
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
