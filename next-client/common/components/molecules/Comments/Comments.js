import CommentListItem from "../../atoms/Comments/CommentListItem";

const Comments = () => {
  let comments = [
    {
      message:
        "Prvi komentar: Potreno je resiti sve zadatke poput filtriranja, sortiranja. AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA ",
      user: "anciz",
      creation_date: "2022-02-06",
      pk: 1,
    },
    {
      message: "Drugi komentar",
      user: "vlado",
      creation_date: "2022-02-06",
      pk: 2,
    },
  ];
  return (
    <>
      {comments?.map((commentItem) => {
        return (
          <div key={commentItem.pk}>
            <CommentListItem comment={commentItem}></CommentListItem>
          </div>
        );
      })}
    </>
  );
};

export default Comments;
