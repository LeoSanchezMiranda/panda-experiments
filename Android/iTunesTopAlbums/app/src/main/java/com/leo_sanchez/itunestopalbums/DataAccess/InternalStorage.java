package com.leo_sanchez.itunestopalbums.DataAccess;

import android.content.Context;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.util.Calendar;
import java.util.Date;

/**
 * Created by ldjam on 3/30/2018.
 */

public final class InternalStorage{

    public InternalStorage() {}

    public static void writeObject(Context context, String key, Object object, int minutesToExpiration) throws IOException {
        FileOutputStream fos = context.openFileOutput(key, Context.MODE_PRIVATE);
        ObjectOutputStream oos = new ObjectOutputStream(fos);

        Calendar date = Calendar.getInstance();
        long t= date.getTimeInMillis();
        Date addMinutes = new Date(t + (minutesToExpiration * 60000));

        CacheObject localObject = new CacheObject(object, addMinutes);

        oos.writeObject(localObject);
        oos.close();
        fos.close();
    }

    public static CacheObject readObject(Context context, String key) throws IOException,
            ClassNotFoundException {
        FileInputStream fis = context.openFileInput(key);
        ObjectInputStream ois = new ObjectInputStream(fis);
        CacheObject object = (CacheObject) ois.readObject();
        return object;
    }
}