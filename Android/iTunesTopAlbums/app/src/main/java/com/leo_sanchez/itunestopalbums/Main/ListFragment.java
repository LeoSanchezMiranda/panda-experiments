package com.leo_sanchez.itunestopalbums.Main;

import android.support.v4.app.Fragment;
import android.content.Context;
import android.os.Bundle;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ListView;

import com.leo_sanchez.itunestopalbums.Models.Album;
import com.leo_sanchez.itunestopalbums.R;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by ldjam on 3/29/2018.
 */

public class ListFragment extends Fragment{

    private static final String SARG_REPOS = "repos";
    private List<Album> mAlbums;

    public ListFragment() {
        mAlbums = new ArrayList<>();
    }

    public static ListFragment newInstance(ArrayList<Album> albums){
        ListFragment fragment = new ListFragment();
        Bundle args = new Bundle();
        args.putParcelableArrayList(SARG_REPOS, albums);
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (getArguments() != null) {
            mAlbums = getArguments().getParcelableArrayList(SARG_REPOS);
        }
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_item_list, container, false);

        if (view instanceof RecyclerView) {
            Context context = view.getContext();
            RecyclerView recyclerView = (RecyclerView) view;
            recyclerView.setLayoutManager(new LinearLayoutManager(context));
            recyclerView.setAdapter(new ListRecyclerViewAdapter(mAlbums));

        }
        return view;
    }

}