import React, { useState } from "react";
import { Goal } from "../utils/types";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  CardActions,
  Button,
  Tooltip,
  LinearProgress,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const GoalCard: React.FC<Goal> = ({
  title,
  targetValue,
  deadline,
  progress,
  id,
}) => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const handleEdit = (id: string) => {
    navigate(`/edit-goal/${id}`);
  };

  const handleDelete = (id: string) => {
    // Implement actual deletion logic here (e.g., API call)
    console.log(`Deleting goal with ID: ${id}`);
  };

  const handleViewDetails = (id: string) => {
    navigate(`/goal-details/${id}`);
  };

  return (
    <Card
      sx={{
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        borderRadius: "12px",
        margin: "16px 0",
        backgroundColor:
          theme.palette.mode === "light" ? "#f2f2f2" : "#212121",
      }}
    >
      <CardContent sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom onClick={() => setExpanded(!expanded)}>
          {title}
        </Typography>

        {expanded && (
          <>
            <Typography variant="body2" color="textSecondary">
              Target: {targetValue}
            </Typography>

            <Typography variant="body2" color="textSecondary">
              Deadline: {new Date(deadline).toLocaleDateString()}
            </Typography>

            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 10,
                borderRadius: 5,
                bgcolor:
                  theme.palette.mode === "light" ? "#f2f2f2" : "#212121",
              }}
            />
          </>
        )}
      </CardContent>

      <CardActions
        sx={{ p: 2, display: "flex", justifyContent: "space-between" }}
      >
        <Tooltip title="Edit Goal" placement="top">
          <IconButton
            onClick={() => handleEdit(id)}
            size="small"
            sx={{
              backgroundColor: "transparent",
              "&:hover": {
                backgroundColor:
                  theme.palette.mode === "light" ? "#f2f2f2" : "#212121",
              },
            }}
          >
            <EditIcon
              sx={{
                color: theme.palette.mode === "light" ? "#333" : "#fff",
              }}
            />
          </IconButton>
        </Tooltip>

        <Tooltip title="Delete Goal" placement="top">
          <IconButton
            onClick={() => handleDelete(id)}
            size="small"
            sx={{
              backgroundColor: "transparent",
              "&:hover": {
                backgroundColor:
                  theme.palette.mode === "light" ? "#f2f2f2" : "#212121",
              },
            }}
          >
            <DeleteIcon
              sx={{
                color: theme.palette.mode === "light" ? "#333" : "#fff",
              }}
            />
          </IconButton>
        </Tooltip>

        <Button
          variant="contained"
          onClick={() => handleViewDetails(id)}
          size="small"
          sx={{
            backgroundColor:
              theme.palette.mode === "light" ? "#333" : "#fff",
            color: theme.palette.mode === "light" ? "#fff" : "#333",
            "&:hover": {
              backgroundColor:
                theme.palette.mode === "light" ? "#444" : "#eee",
            },
          }}
        >
          View Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default GoalCard;