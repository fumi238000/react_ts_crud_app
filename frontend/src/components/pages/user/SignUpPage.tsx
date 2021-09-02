import { Flex, Box, Heading, Divider, Stack, Input } from "@chakra-ui/react";
import { ChangeEvent, memo, useState, VFC } from "react";
import { Link } from "react-router-dom";
import { useUserSignUp } from "../../../hooks/useUserSignUp";
import { BlueButton } from "../../atms/button/LoginButton";

export const SignUpPage: VFC = memo(() => {
  const [inputEmail, setinputEmail] = useState<string>("");
  const [inputPassword, setinputPassword] = useState<string>("");
  const onChangeInputEmail = (e: ChangeEvent<HTMLInputElement>) =>
    setinputEmail(e.target.value);
  const onChangeInputUserPassword = (e: ChangeEvent<HTMLInputElement>) =>
    setinputPassword(e.target.value);
  const { signUp, loading } = useUserSignUp();
  const onClickSignUp = () => signUp(inputEmail, inputPassword);

  return (
    <Flex align="center" justify="center" height="100vh">
      <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
        <Heading as="h1" size="lg" textAlign="center" py={4}>
          新規作成
        </Heading>
        <Divider my={4}></Divider>
        <Stack spacing={4} py={4} px={6}>
          <p>Email</p>
          <Input
            placeholder="Email"
            type="email"
            value={inputEmail}
            onChange={onChangeInputEmail}
          />
          <p>パスワード</p>
          <Input
            placeholder="パスワード"
            type="password"
            value={inputPassword}
            onChange={onChangeInputUserPassword}
          />
          <BlueButton
            onClick={onClickSignUp}
            loading={loading}
            inputEmail={inputEmail}
            inputPassword={inputPassword}
          >
            新規作成
          </BlueButton>
          <Box pt={4} align="center">
            <Link to="/login">ログインする</Link>
          </Box>
        </Stack>
      </Box>
    </Flex>
  );
});
