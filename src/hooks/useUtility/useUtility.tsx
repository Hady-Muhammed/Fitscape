function useUtility() {
  const scrollToTop = () => {
    if (window.scrollY)
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
  };
  return { scrollToTop };
}

export default useUtility;
