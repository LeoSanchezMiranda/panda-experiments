package com.leo_sanchez.itunestopalbums.DataAccess.DTO;

import com.google.gson.annotations.SerializedName;

import java.util.List;

/**
 * Created by ldjam on 3/28/2018.
 */

public class Feed {
    @SerializedName("entry")
    public List<FeedEntry> entry;
}

