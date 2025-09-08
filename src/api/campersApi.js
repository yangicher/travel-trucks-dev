import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = 'https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers'
const campersPerPage = 4

export const campersForms = ['panelTruck', 'fullyIntegrated', 'alcove']

export const fetchCampers = createAsyncThunk(
  "campers/fetchCampers",
  async (filters, { rejectWithValue }) => {
    try {
      const filteredParams = {};
      for (const key in filters) {
        if (filters[key] !== false) {
          filteredParams[key] = filters[key];
        }
      }

      console.log("Filtered Params:", filteredParams);
      const { data } = await axios.get(API_BASE_URL, {
        params: filteredParams,
      });
      console.log("API Response:", data);
      return data.data.items;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCamperDetails = createAsyncThunk(
  "campers/fetchCamperDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${id}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);