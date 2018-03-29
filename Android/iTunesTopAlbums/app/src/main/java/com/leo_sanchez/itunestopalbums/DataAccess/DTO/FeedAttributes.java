package com.leo_sanchez.itunestopalbums.DataAccess.DTO;

import com.google.gson.annotations.SerializedName;

/**
 * Created by ldjam on 3/28/2018.
 */

public class FeedAttributes {
    @SerializedName("height")
    public String height;
    @SerializedName("amount")
    public String amount;
    @SerializedName("currency")
    public String currency;
    @SerializedName("term")
    public String term;
    @SerializedName("label")
    public String label;
    @SerializedName("rel")
    public String rel;
    @SerializedName("type")
    public String type;
    @SerializedName("href")
    public String href;
    @SerializedName("im:id")
    public String id;
}
