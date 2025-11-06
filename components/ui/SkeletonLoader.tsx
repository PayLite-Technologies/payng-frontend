"use client";

export function SkeletonLoader() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="mb-8">
        <div className="h-8 bg-gray-200 rounded w-64 mb-2" />
        <div className="h-4 bg-gray-200 rounded w-96" />
      </div>

      {/* Student Selector Skeleton */}
      <div className="mb-6">
        <div className="h-4 bg-gray-200 rounded w-32 mb-2" />
        <div className="h-12 bg-gray-200 rounded" />
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <div className="h-96 bg-gray-200 rounded-lg" />
        </div>
        <div>
          <div className="h-96 bg-gray-200 rounded-lg" />
        </div>
      </div>

      {/* Table Skeleton */}
      <div className="bg-gray-200 rounded-lg h-64" />
    </div>
  );
}
