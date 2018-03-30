package com.leo_sanchez.itunestopalbums.Utilities;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;

/**
 * Created by ldjam on 3/29/2018.
 */

public class BitMapUtility {
    public static Bitmap loadBitmap(String url) {
        Bitmap bitmap = null;

        try {
            bitmap = BitmapFactory.decodeStream((InputStream)new URL(url).getContent());
        } catch (IOException e) {
            e.printStackTrace();
        }

        return bitmap;
    }
}
