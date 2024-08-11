import React, { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import DOMPurify from "dompurify";

const BlogContent = () => {
  const { id } = useParams();
  console.log(id);

  const [data, setData] = useState([]);
  const [redirectToNotFound, setRedirectToNotFound] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_DATABASE_API_URL}/blog/${id}`,
        );
        const result = await response.json();
        setData(result);

        if (result.length === 0) {
          setRedirectToNotFound(true);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  const sanitizedHTML =
    data.length > 0 ? DOMPurify.sanitize(data[0].content) : "";

  if (redirectToNotFound) {
    return <Navigate to="/404" />;
  }

  return (
    <div className="blog-content">
      <div className="blog-content__container">
        {data.length > 0 && (
          <div className="blog-content__container__item">
            <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogContent;
