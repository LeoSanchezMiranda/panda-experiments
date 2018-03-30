package com.leo_sanchez.itunestopalbums.Utilities;

import android.app.Application;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;

import com.leo_sanchez.itunestopalbums.DataAccess.CacheObject;
import com.leo_sanchez.itunestopalbums.DataAccess.InternalStorage;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;

/**
 * Created by ldjam on 3/29/2018.
 */

public class BitMapUtility extends Application{
    public static Bitmap loadBitmap(String url) {
        String cacheKey = "IMAGE_" + url.replace(".", "").replace("-", "").replace("/", "");

        Bitmap bitmap = null;
        InputStream imageStream = getBitmapImageStream(cacheKey);

        if(imageStream != null){
            bitmap = BitmapFactory.decodeStream(imageStream);
            return bitmap;
        }

        try {
            bitmap = BitmapFactory.decodeStream((InputStream)new URL(url).getContent());
        } catch (IOException e) {
            e.printStackTrace();
        }

        if(bitmap != null){
            try {
                InternalStorage.writeObject(MyApplication.getAppContext(), cacheKey, bitmap, 10);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        return bitmap;
    }

    public static InputStream getBitmapImageStream(String cacheKey){
        CacheObject cachedImage = null;

        try{
            cachedImage = InternalStorage.readObject(MyApplication.getAppContext(), cacheKey);
        } catch (IOException e) {
            e.printStackTrace();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }

        if(cachedImage != null && cachedImage.isActive()){
            return (InputStream) cachedImage.getValue();
        }

        return null;
    }
}
