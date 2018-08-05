function hoursDiff(pastTime) {
  const now = new Date();
  const then = new Date(pastTime);

  const msDiff = now.getTime() - then.getTime();

  return Math.trunc(msDiff / 3600000);
}

module.exports = { hoursDiff };
