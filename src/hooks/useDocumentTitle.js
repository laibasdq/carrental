import { useEffect } from "react";

function useDocumentTitle(title) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title ? `${title} | DriveEasy` : "DriveEasy";

    return () => {
      document.title = previousTitle;
    };
  }, [title]);
}

export default useDocumentTitle;