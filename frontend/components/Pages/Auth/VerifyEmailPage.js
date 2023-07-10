import React from "react";
import { Center, Container, Heading, Link, Text } from "native-base";
import Page from "../../Shared/Page";

export default function VerifyEmailPage() {
  const resendEmail = () => {
    // TODO: Resend email verification link
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
          <Link mt="2" _text={{ color: "primary.400" }}>
            Not there? Click to resend email.
          </Link>
        </Container>
      </Center>
    </Page>
  );
}
