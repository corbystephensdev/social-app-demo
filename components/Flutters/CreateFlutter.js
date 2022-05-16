import { createStyles, Avatar, Group, Textarea, Button } from "@mantine/core";
import { useForm } from "@mantine/form";

const demoUser = {
  id: "6276d0c602ce122f7b8b11ec",
  name: "Jesse Hall",
  nickname: "codestackr",
  picture:
    "https://lh3.googleusercontent.com/a-/AOh14GgPdA54bhnYcSngbZxMuSLe-khjk-BaaKWsvmxD=s96-c",
};

const useStyles = createStyles((theme) => ({
  flutter: {
    padding: `${theme.spacing.lg}px ${theme.spacing.xl}px`,
  },
  createFlutter: {
    justifyContent: "center",
  },
  media: {
    width: "50vw",
    [`@media (max-width: ${theme.breakpoints.lg}px)`]: {
      width: "25vw",
    },
  },
}));

const CreateFlutter = ({ setFlutters }) => {
  const user = demoUser;
  const { classes } = useStyles();
  const form = useForm({
    initialValues: {
      flutter: "",
    },
  });

  const onSubmitFlutter = async (value) => {
    const flutter = {
      postedAt: Date.now(),
      body: value.flutter,
      likes: [],
      user: {
        id: user.id,
        name: user.name,
        nickname: user.nickname,
        picture: user.picture,
      },
    };
    const response = await fetch("/api/flutter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(flutter),
    });

    const responseJson = await response.json();

    setFlutters((flutters) => [
      {
        _id: responseJson.insertedId,
        ...flutter,
      },
      ...flutters,
    ]);
    form.reset();
  };

  return (
    <Group position={"center"} mt={10} mb={20}>
      <Avatar src={user.picture} alt={user.name} radius="xl" />
      <form onSubmit={form.onSubmit((value) => onSubmitFlutter(value))}>
        <Group>
          <Textarea
            required
            placeholder="Send a flutter..."
            variant="filled"
            className={classes.media}
            {...form.getInputProps("flutter")}
          />
          <Button type="submit">Send</Button>
        </Group>
      </form>
    </Group>
  );
};

export default CreateFlutter;