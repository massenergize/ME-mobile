import React from "react";
import { Button, Center, Container, Heading, Link, Text } from "native-base";

import Page from "../../Shared/Page";
import useAuth from "../../Hooks/useAuth";

export default function EmailVerificationPage({ onRefresh }) {
  const { signOut, sendVerificationEmail } = useAuth();

  const resendEmail = () => {
    sendVerificationEmail(null, (error) => {
      if (error) {
        console.log("Error sending verification email", error);
      } else {
        console.log("Verification email sent succeeded!");
      }
    });
  };

  return (
    <Page position="absolute" height="full" width="full" zIndex="1">
      <Center width="100%" flex="1">
        <Container>
          <Heading color="coolGray.600" fontWeight="medium">
            Check your email
          </Heading>
          <Text mt="10" color="coolGray.600">
            We sent a link to your email. Please click that link to continue.
            Not in your inbox? Please check your{" "}
            <Text fontWeight="bold">SPAM</Text> and{" "}
            <Text fontWeight="bold">Promotions</Text> folders.
          </Text>
          <Link
            mt="2"
            _text={{ color: "primary.400" }}
            onPress={() => resendEmail()}
          >
            Not there? Click to resend email.
          </Link>
        </Container>
        <Button mt="20" width="80%" onPress={onRefresh}>
          I've Verified My Email
        </Button>
        <Button
          mt="3"
          width="80%"
          backgroundColor="muted.400"
          onPress={() => signOut()}
        >
          Sign Me Out
        </Button>
      </Center>
    </Page>
  );
}
