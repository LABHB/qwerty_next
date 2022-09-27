import { Button } from "@chakra-ui/react";
import { memo } from "react";

export const PrimaryButton= memo(function PrimaryButton (props) {
  const { children, disabled = false, loading = false, onClick } = props;
  return (
    <Button
      bg="#506fb2"
      color="white"
      _hover={{ opacity: 0.8 }}
      disabled={disabled}
      isLoading={loading}
      onClick={onClick}
    >
      {children}
    </Button>
  );
});