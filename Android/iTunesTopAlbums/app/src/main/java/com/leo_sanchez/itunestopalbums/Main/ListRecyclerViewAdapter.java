package com.leo_sanchez.itunestopalbums.Main;

import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.leo_sanchez.itunestopalbums.Logic.BitMapUtility;
import com.leo_sanchez.itunestopalbums.Models.Album;
import com.leo_sanchez.itunestopalbums.R;

import java.util.List;

/**
 * Created by ldjam on 3/29/2018.
 */

class ListRecyclerViewAdapter extends RecyclerView.Adapter<AlbumViewHolder> {

    private final List<Album> mAlbums;

    public ListRecyclerViewAdapter(List<Album> mAlbums) {
        this.mAlbums = mAlbums;
    }

    @Override
    public AlbumViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.album_list_item, parent, false);

        return new AlbumViewHolder(view);
    }

    @Override
    public void onBindViewHolder(AlbumViewHolder holder, int position) {
        Album album = mAlbums.get(position);
        holder.mAlbum =album;
        holder.mAlbumName.setText(album.name);
        holder.mAlbumArtist.setText(album.atist);
        holder.mAlbumCover.setImageBitmap(BitMapUtility.loadBitmap(album.getThumbnail()));
        holder.mAlbumId.setText(album.id);
    }

    @Override
    public int getItemCount() {
        return mAlbums.size();
    }
}