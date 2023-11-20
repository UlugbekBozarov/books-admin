import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Trans } from "react-i18next";
import {
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { get } from "lodash";

import { InfoItem } from "components/common";
import { DisplayImage, NoData } from "components/form";
import { client } from "services/api";
import {
  Add,
  ChevronLeft,
  Delete,
  DraggableHorizontal,
  Edit,
} from "assets/icons";
import TopicsList from "./TopicsList";

interface BookType {
  category?: {
    booksCount: number;
    createdAt: string;
    description?: string | null | undefined;
    id: string;
    name: string;
    updatedAt: string;
  };
  createdAt: string;
  description?: string | null | undefined;
  id: string;
  name: string;
  updatedAt: string;
}

const BooksInfo = () => {
  const navigate = useNavigate();
  const { bookId } = useParams();

  const theme = useTheme();

  const [book, setBook] = useState<{
    loading: boolean;
    data?: BookType | null | undefined;
  }>({
    loading: true,
    data: null,
  });
  const [topics, setTopics] = useState<{
    loading: boolean;
    data: any;
  }>({
    loading: true,
    data: [],
  });

  const handleGoBack = () => {
    navigate(-1);
  };

  const getBooksData = () => {
    try {
      client.get(`books/by-id/${bookId}`).then((response: any) => {
        setBook({
          loading: false,
          data: response,
        });
      });
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const getTopics = () => {
    try {
      client
        .get(`topics/${bookId}`)
        .then((response) => {
          setTopics({
            loading: false,
            data: response,
          });
        })
        .catch((error) => {
          console.log("Error: ", error);
        });
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const goToEdit = () => {
    navigate(`/books/edit/${bookId}`);
  };

  const goToAddTopic = () => {
    navigate(`/books/${bookId}/topic/add`);
  };

  const goToEditTopic = (topic: any) => () => {
    navigate(`/books/${bookId}/topic/edit/${get(topic, "id")}`);
  };

  const handleDelete = (topic: any) => () => {
    client
      .delete(`topics/${get(topic, "id")}`)
      .then(() => {
        getTopics();
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  const handleDeleteBook = () => {
    try {
      client.delete(`books/${bookId}`).then(() => {
        navigate(-1);
      });
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    getBooksData();
    getTopics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={8} xl={9} order={{ xs: 2, lg: 1 }}>
        <Card>
          <Box p={2}>
            <Grid container spacing={2} mb="20px">
              <Grid item xs={12}>
                <DisplayImage value={get(book, "data.image", "")} />
              </Grid>
              <Grid item xs={12} md={6}>
                <InfoItem
                  labelKey="books.name"
                  value={get(book, "data.name", "")}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <InfoItem
                  labelKey="books.category"
                  value={get(book, "data.category.name", "")}
                />
              </Grid>
              <Grid item xs={12}>
                <InfoItem
                  labelKey="books.description"
                  value={get(book, "data.description", "")}
                />
              </Grid>
            </Grid>
          </Box>
        </Card>
        <Box mt="20px">
          <Card>
            <Box p={2}>
              <List
                subheader={
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    textAlign="center"
                    mb="20px"
                  >
                    <Trans>books.topics</Trans>
                  </Typography>
                }
              >
                {!get(topics, "loading") && !get(topics, "data.length") ? (
                  <NoData />
                ) : (
                  <TopicsList
                    data={get(topics, "data", [])}
                    setTopics={setTopics}
                  />
                  // get(topics, "data", []).map((topic: any) => (
                  //   <ListItemButton
                  //     sx={{ borderRadius: "12px", padding: "8px 4px" }}
                  //     key={get(topic, "id")}
                  //   >
                  //     <ListItemIcon sx={{ minWidth: "38px" }}>
                  //       <IconButton disabled>
                  //         <DraggableHorizontal />
                  //       </IconButton>
                  //     </ListItemIcon>
                  //     <ListItemText
                  //       id="switch-list-label-bluetooth"
                  //       primary={get(topic, "name")}
                  //     />
                  //     <Stack direction="row" spacing={1}>
                  //       <IconButton onClick={goToEditTopic(topic)}>
                  //         <Edit color={theme.palette.primary.main} />
                  //       </IconButton>
                  //       <IconButton onClick={handleDelete(topic)}>
                  //         <Delete color={theme.palette.error.main} />
                  //       </IconButton>
                  //     </Stack>
                  //   </ListItemButton>
                  // ))
                )}
              </List>
            </Box>
          </Card>
        </Box>
      </Grid>
      <Grid item xs={12} lg={4} xl={3} order={{ xs: 1, lg: 2 }}>
        <Card sx={{ position: "sticky", top: 0 }}>
          <Box p={2}>
            <Stack spacing={2}>
              <Button
                size="large"
                onClick={goToEdit}
                variant="contained"
                startIcon={<Edit />}
              >
                <Trans>edit</Trans>
              </Button>
              <Button
                size="large"
                variant="contained"
                onClick={goToAddTopic}
                startIcon={<Add />}
              >
                <Trans>books.addTopic</Trans>
              </Button>
              <Button
                size="large"
                variant="contained"
                color="error"
                onClick={handleDeleteBook}
                startIcon={<Delete />}
              >
                <Trans>delete</Trans>
              </Button>
              <Button
                size="large"
                variant="outlined"
                onClick={handleGoBack}
                startIcon={<ChevronLeft color={theme.palette.primary.main} />}
              >
                <Trans>goBack</Trans>
              </Button>
            </Stack>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
};

export default BooksInfo;
