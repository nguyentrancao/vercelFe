import React from 'react';

/**
 * NotFoundPage: A React component representing the 404 error page.
 */
const NotFoundPage: React.FC = () => {
    return (
<div class="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-900">
  <h1 class="text-6xl font-bold text-gray-900 dark:text-black">404</h1>
  <p class="text-xl text-gray-700 dark:text-gray-900">Trang không tìm thấy</p>
  <p class="my-4 text-gray-500 dark:text-gray-600">
    Trang bạn đang tìm kiếm có thể đã bị xóa, đổi tên, hoặc tạm thời không khả dụng.
  </p>
  <button class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
    <a href="/">Về Trang Chủ</a>
  </button>
</div>
    );
};

export default NotFoundPage;