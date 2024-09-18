function useUtility() {
  const scrollToTop = () => {
    const page = document.querySelector("ion-content");
    page?.scrollToTop(0);
  };
  return { scrollToTop };
}

export default useUtility;
