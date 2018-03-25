package com.leo_sanchez.columbiatennisladder.Adapters;

import android.content.ClipData;
import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.TextView;

import com.leo_sanchez.columbiatennisladder.Models.Player;
import com.leo_sanchez.columbiatennisladder.R;

import java.util.List;

/**
 * Created by ldjam on 3/24/2018.
 */

public class LadderPositionsListAdapter extends ArrayAdapter<Player> {

    public LadderPositionsListAdapter(Context context, int textViewResourceId) {
        super(context, textViewResourceId);
    }

    public LadderPositionsListAdapter(Context context, int resource, List<Player> items) {
        super(context, resource, items);
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {

        View v = convertView;

        if (v == null) {
            LayoutInflater vi;
            vi = LayoutInflater.from(getContext());
            v = vi.inflate(R.layout.player_position, null);
        }

        Player p = getItem(position);

        if (p != null) {
            TextView playerPosition = (TextView) v.findViewById(R.id.playerPosition);
            TextView playerName = (TextView) v.findViewById(R.id.fullName);

            if (playerName != null) {
                playerName.setText(p.getFullName());
            }

            if (playerPosition != null) {
                playerPosition.setText(p.position + "");
            }
        }

        return v;
    }

}
