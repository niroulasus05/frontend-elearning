import React from 'react'
import { COURSE_CATEGORIES, DIFFICULTY_LEVELS } from '../lib/constants'

/**
 * Search and Filter Component
 * Provides search and filtering functionality for courses
 */
const SearchFilter = ({ filters, onFilterChange, onSearch }) => {
  const handleSearchChange = (e) => {
    onSearch(e.target.value)
  }

  const handleCategoryChange = (e) => {
    onFilterChange({ ...filters, category: e.target.value })
  }

  const handleLevelChange = (e) => {
    onFilterChange({ ...filters, level: e.target.value })
  }

  const handleStatusChange = (e) => {
    onFilterChange({ ...filters, status: e.target.value })
  }

  const handleReset = () => {
    onFilterChange({ category: 'All', level: 'All', status: 'All' })
    onSearch('')
  }

  return (
    <div className="search-filter">
      <div className="search-box">
        <input
          type="text"
          className="search-input"
          placeholder="Search courses by title, category, or description..."
          value={filters.search || ''}
          onChange={handleSearchChange}
        />
        <span className="search-icon">🔍</span>
      </div>

      <div className="filter-controls">
        <div className="filter-group">
          <label htmlFor="category-filter">Category</label>
          <select
            id="category-filter"
            className="filter-select"
            value={filters.category || 'All'}
            onChange={handleCategoryChange}
          >
            <option value="All">All Categories</option>
            {COURSE_CATEGORIES.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="level-filter">Level</label>
          <select
            id="level-filter"
            className="filter-select"
            value={filters.level || 'All'}
            onChange={handleLevelChange}
          >
            <option value="All">All Levels</option>
            {DIFFICULTY_LEVELS.map(level => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="status-filter">Status</label>
          <select
            id="status-filter"
            className="filter-select"
            value={filters.status || 'All'}
            onChange={handleStatusChange}
          >
            <option value="All">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="draft">Draft</option>
          </select>
        </div>

        <button className="btn-reset" onClick={handleReset}>
          Reset Filters
        </button>
      </div>
    </div>
  )
}

export default SearchFilter