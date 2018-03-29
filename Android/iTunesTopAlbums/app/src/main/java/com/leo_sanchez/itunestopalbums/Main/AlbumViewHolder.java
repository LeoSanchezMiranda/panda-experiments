package com.leo_sanchez.itunestopalbums.Main;

import android.support.v7.widget.RecyclerView;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.leo_sanchez.itunestopalbums.Models.Album;
import com.leo_sanchez.itunestopalbums.R;

import org.w3c.dom.Text;

/**
 * Created by ldjam on 3/29/2018.
 */

public class AlbumViewHolder extends RecyclerView.ViewHolder {
    public final View mView;
    public Album mAlbum;
    public final TextView mAlbumName;
    public final TextView mAlbumArtist;
    public final ImageView mAlbumCover;
    public final TextView mAlbumId;

    public AlbumViewHolder(View view) {
        super(view);
        mView = view;
        mAlbumName = (TextView) view.findViewById(R.id.albumName);
        mAlbumArtist = (TextView) view.findViewById(R.id.albumArtist);
        mAlbumId = (TextView) view.findViewById(R.id.albumId);
        mAlbumCover = (ImageView) view.findViewById(R.id.albumThumbnail);
    }

    @Override
    public String toString() {
        return super.toString() + " '" + mAlbumName.getText() + "'";
    }

}
