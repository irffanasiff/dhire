import {
  Box,
  Center,
  Container,
  Divider,
  Flex,
  Heading,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react';

const Footer = () => {
  return (
    <Container maxW='85rem' pt='6rem' px='2rem'>
      <Box w='100%' h='0.09rem' bg='gray.500' />
      <Flex
        gap='4rem'
        flexDirection={['column', 'row']}
        justify='space-between'
        py='6rem'
      >
        <VStack alignItems={'start'}>
          <Heading>D-Hire.</Heading>
          <Text color='#686868' maxW='25rem'>
            D-Hire is on a mission to enhance applicant’s experience and making
            it dead simple for leading recruiters to hire top tech talent.
          </Text>
        </VStack>
        <Flex
          flexDirection={['column-reverse', 'column-reverse', 'row']}
          gap={{ base: '2rem', md: '4rem' }}
        >
          <VStack alignItems={'start'}>
            <Heading fontSize='2xl'>Candidates</Heading>
            <Text color='#686868'>Apply for job</Text>
            <Text color='#686868'>Candidate FAQ</Text>
          </VStack>
          <VStack alignItems={'start'}>
            <Heading fontSize='2xl'>Employers</Heading>
            <Text color='#686868'>Hire Talent</Text>
            <Text color='#686868'>Employer FAQ</Text>
          </VStack>
          <VStack alignItems={'start'}>
            <Heading fontSize='2xl'>Blog</Heading>
          </VStack>
        </Flex>
      </Flex>
    </Container>
  );
};

export default Footer;
