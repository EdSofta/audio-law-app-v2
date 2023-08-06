import CacheHelper from "../utils/cache";
import {
  audioByCategoryApi,
  audioByFreePlayApi,
  audioByRecentsApi,
  audioInfoApi,
  categoriesApi,
} from "../api/audio";
import { CancelTokenSource } from "axios";
import { AudioInfo } from "../models/audio.model";
import { Category } from "../models/category.model";

const keys = {
  category: "category",
  audioByCategory: "audioByCategory",
  recentAudio: "recentAudio",
  freeAudio: "freeAudio",
  audioInfo: "audioInfo",
};

const { getItem, putItem, deleteItem } = CacheHelper();

export const getCategories = async (cancelSource: CancelTokenSource) => {
  const categories = await getItem<Category[]>(keys.category);
  if (!categories) {
    const res = await categoriesApi(cancelSource);
    if (res.ok) {
      putItem(keys.category, res.data?.data);
      return {
        data: res.data?.data,
        message: res.data?.message,
        ok: true,
      };
    }
    return {
      message: res.data?.message,
      ok: false,
      problem: res.problem,
    };
  }
  return {
    data: categories,
    message: "",
    ok: true,
  };
};

export const getAudioByCategory = async (
  category: string,
  cancelSource: CancelTokenSource,
  invalidate?: boolean
): Promise<any> => {
  if (category == "recently") {
    return getRecentAudio(cancelSource, invalidate);
  }
  const audioList = await getItem<AudioInfo[]>(keys.audioByCategory + category);
  if (!audioList || invalidate) {
    const res = await audioByCategoryApi(category, cancelSource);
    if (res.ok) {
      putItem(keys.audioByCategory + category, res.data?.data);
      return {
        data: res.data?.data,
        message: res.data?.message,
        ok: true,
      };
    }
    return {
      message: res.data?.message,
      ok: false,
      problem: res.problem,
    };
  }
  return {
    data: audioList,
    message: "",
    ok: true,
  };
};

export const getRecentAudio = async (
  cancelSource: CancelTokenSource,
  invalidate?: boolean
): Promise<any> => {
  const audioList = await getItem<AudioInfo[]>(keys.recentAudio);
  if (!audioList || invalidate) {
    const res = await audioByRecentsApi(cancelSource);
    if (res.ok) {
      putItem(keys.recentAudio, res.data?.data);
      return {
        data: res.data?.data,
        message: res.data?.message,
        ok: true,
      };
    }
    return {
      message: res.data?.message,
      ok: false,
      problem: res.problem,
    };
  }
  return {
    data: audioList,
    message: "",
    ok: true,
  };
};

export const getFreeAudio = async (
  cancelSource: CancelTokenSource,
  invalidate?: boolean
): Promise<any> => {
  const audioList = await getItem<AudioInfo[]>(keys.freeAudio);
  if (!audioList || invalidate) {
    const res = await audioByFreePlayApi(cancelSource);
    if (res.ok) {
      putItem(keys.freeAudio, res.data?.data);
      return {
        data: res.data?.data,
        message: res.data?.message,
        ok: true,
      };
    }
    return {
      message: res.data?.message,
      ok: false,
      problem: res.problem,
    };
  }
  return {
    data: audioList,
    message: "",
    ok: true,
  };
};

export const getAudioInfo = async (
  id: string,
  cancelSource: CancelTokenSource,
  invalidate?: boolean
) => {
  const audio = await getItem<AudioInfo>(keys.audioInfo + id);
  if (!audio || invalidate) {
    const res = await audioInfoApi(id, cancelSource);
    if (res.ok) {
      putItem(keys.audioInfo + id, JSON.stringify(res.data?.data || "[]"));
      return {
        data: res.data?.data,
        message: res.data?.message,
        ok: true,
      };
    }
    return {
      message: res.data?.message,
      ok: false,
      problem: res.problem,
    };
  }
  return {
    data: audio,
    message: "",
    ok: true,
  };
};
