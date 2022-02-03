
const SearchListOfCommits = ({ commit }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Hash</th>
          <th scope="col">Comitted date</th>
          <th scope="col">Author</th>
          <th scope="col">Message</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr >
          <td>{commit?.hash}</td>
          <td>{commit?.committed_date}</td>
          <td>{commit?.author}</td>
          <td>{commit?.message}</td>
        </tr>
      </tbody>
    </table >
  );
};

export default SearchListOfCommits;
