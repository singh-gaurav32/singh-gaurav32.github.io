import { Container, Text, Group } from "@mantine/core";
import { useMantineTheme } from "@mantine/core";
export default function MyHeader({ opened, toggle }) {
  const theme = useMantineTheme();

  return (
    <div>
      <Container style={{ height: "100%" }}>
        <Group align="center" justify="center" style={{ height: "100%" }}>
          <Text align="center" weight={700} size="xl" color="cyan">
            You are Gaurav's Page
          </Text>
        </Group>
      </Container>
    </div>
  );
}
