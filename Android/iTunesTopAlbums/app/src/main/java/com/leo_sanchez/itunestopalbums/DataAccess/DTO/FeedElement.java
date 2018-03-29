package com.leo_sanchez.itunestopalbums.DataAccess.DTO;

import com.google.gson.annotations.SerializedName;

import java.util.List;

/**
 * Created by ldjam on 3/28/2018.
 */

public class FeedElement {
    @SerializedName("label")
    public String description;
    @SerializedName("attributes")
    public FeedAttributes attributes;
}
