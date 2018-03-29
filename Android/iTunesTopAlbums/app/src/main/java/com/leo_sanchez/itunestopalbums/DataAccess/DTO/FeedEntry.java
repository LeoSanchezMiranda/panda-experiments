package com.leo_sanchez.itunestopalbums.DataAccess.DTO;

import com.google.gson.annotations.SerializedName;

import java.util.List;

public class FeedEntry{
    @SerializedName("im:name")
    public FeedElement name;
    @SerializedName("im:image")
    public List<FeedElement> images;
    @SerializedName("im:itemCount")
    public FeedElement itemCount;
    @SerializedName("im:price")
    public FeedElement price;
    @SerializedName("rights")
    public FeedElement rights;
    @SerializedName("title")
    public FeedElement title;
    @SerializedName("link")
    public FeedElement link;
    @SerializedName("id")
    public FeedElement id;
    @SerializedName("im:artist")
    public FeedElement artist;
    @SerializedName("category")
    public FeedElement category;
    @SerializedName("im:releaseDate")
    public FeedElement releaseDate;
}
