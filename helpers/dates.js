function formatDate(date) {
  const dateObj = new Date(date);

  const options = {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour12: true,
    hour: '2-digit',
    minute: '2-digit',
  };

  return dateObj.toLocaleString('en-US', options);
}

module.exports = { formatDate };
