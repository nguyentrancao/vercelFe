import React, { useEffect, useState } from "react";
export default function BlogList() {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_DATABASE_API_URL}/blog`,
      );
      const result = await response.json();
      setData(result);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const formatDate = (postDate) => {
    const d = new Date(postDate);
    const ye = new Intl.DateTimeFormat("vi", { year: "numeric" }).format(d);
    const mo = new Intl.DateTimeFormat("vi", { month: "2-digit" }).format(d);
    const da = new Intl.DateTimeFormat("vi", { day: "2-digit" }).format(d);
    return `${da}/${mo}/${ye}`;
  };
  return (
    //map blog list
    <div>
      <div class="w-4/5 mx-auto mt-6">
        <div class="space-y-8">
          {data.map((item) => (
            <div className="flex flex-col md:flex-row items-start md:items-center md:space-x-6 border-2 border-gray-200 shadow-md p-4 rounded-md">
              <span class="relative flex overflow-hidden square-full w-50 h-40 md:w-32 md:h-50">
                <img
                  src={item.thumbnail}
                  alt=""
                  class="absolute inset-0 w-full h-full object-cover"
                />
              </span>
              <div class="mt-4 md:mt-0 w-full md:w-[80%]">
                <h2 class="text-2xl md:text-3xl font-bold">
                  <a href={`/blog/${item.blogID}`}>{item.title}</a>
                </h2>
                <p class="text-gray-500 dark:text-gray-400 mt-2">
                  Ngày đăng: {formatDate(item.postDate)}
                </p>
                <p class="text-lg text-gray-700 mt-2">{item.shortdesc}</p>
                <a class="mt-4 inline-flex" href={`/blog/${item.blogID}`}>
                  <button class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                    Xem thêm
                  </button>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
