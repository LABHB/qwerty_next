import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay
} from "@chakra-ui/react";
import { memo } from "react";
import { Link } from "react-router-dom";


export const MenuDrawer = memo( function MenuDrawer(props) {
  const {
    onClose,
    isOpen,
    // onClickHome,
    // onClickUserManagement,
    // onClickSetting
  } = props;
  return (
    <Drawer placement="left" size="xs" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerBody p={0} bg="gray.100">
            {/* <Button w="100%" onClick={onClickHome} href="/"> */}
            <Button as="a" href="/home" w="100%" onClick={onClose} >
              TOP
            </Button>
            {/* <Button w="100%" onClick={onClickUserManagement}> */}
            <Button as="a" href="/home" w="100%" onClick={onClose} >
              SERVICE
            </Button>
            {/* <Button w="100%" onClick={onClickSetting}> */}
            <Button as="a" href="/home" w="100%" onClick={onClose} >
              ACCOUNTINFOACCOUNTINFO
            </Button>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
});
