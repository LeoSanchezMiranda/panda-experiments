package com.leo_sanchez.itunestopalbums.DataAccess;

import java.io.Serializable;
import java.util.Date;

/**
 * Created by ldjam on 3/30/2018.
 */

public class CacheObject implements Serializable{
    Object cachedObject;
    Date expirationDate;

    public CacheObject(Object objectToCache, Date expirationDate){
        this.cachedObject = objectToCache;
        this.expirationDate = expirationDate;
    }

    public Object getValue(){
        if(cachedObject == null){
            return null;
        }

        return cachedObject;
    }

    public boolean isActive(){
        if(expirationDate == null){
            return false;
        }

        Date now = new Date();

        return expirationDate.after(now);
    }
}
