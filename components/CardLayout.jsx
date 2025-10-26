import Card from "./Card";
import "../css/index.css";
import fetchData from "./fetchData";
import { useEffect, useState } from "react";
import pageLength from "../constant/pageLength";
const CardLayout = () => {
  const [data, setData] = useState([]);
  const [currPage, setCurrPage] = useState(0);
  const [start, setStart] = useState(0);
  const totalPages = Math.ceil(data.length / pageLength);
  const handlePageClick = (ind) => {
    setStart(ind * pageLength);
    setCurrPage(ind);
  };

  const handleNextClick = () => {
    setCurrPage((prevPage) => {
      const nextPage = prevPage + 1;
      setStart(nextPage * pageLength);
      return nextPage;
    });
  };

  const handlePrevClick = () => {
    setCurrPage((prevPage) => {
      const prev = prevPage - 1;
      setStart(prev * pageLength);
      return prev;
    });
  };
  useEffect(() => {
    const getData = async () => {
      const result = await fetchData();
      setData(result.products);
    };
    getData();
  }, []);

  return (
    <>
      <div>
        <button onClick={handlePrevClick} disabled={currPage == 0}>
          Prev
        </button>
        {[...Array(totalPages).keys()].map((item, ind) => {
          return (
            <span
              className={`page-no ${currPage == ind ? "currPage" : ""}`}
              key={ind}
              onClick={() => handlePageClick(ind)}
            >
              {item + 1}
            </span>
          );
        })}

        <button onClick={handleNextClick} disabled={currPage == totalPages - 1}>
          Next
        </button>
      </div>
      <div className="general">
        <h1>{currPage + 1}</h1>
        {data.length == 0 ? (
          <h3>Loading data...</h3>
        ) : (
          data.slice(start, start + pageLength).map((item) => {
            return (
              <div key={item.id}>
                <Card data={item} />
              </div>
            );
          })
        )}
      </div>
    </>
  );
};
export default CardLayout;
