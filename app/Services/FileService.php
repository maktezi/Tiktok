<?php

namespace App\Services;

use Intervention\Image\Facades\Image;

class FileService
{
    public function updateImage($model, $request)
    {
        $image = Image::make($request->file('image'));
        if (!empty($model->image)) {
            $currentImage = public_path() . $model->image;
            if (file_exists($currentImage) && $currentImage != public_path() . '/user-placeholder.png') {
                unlink($currentImage);
            }
        }

        $file = $request->file('image');
        $extension = $file->getClientOriginalExtension();
        $name = time() . '.' . $extension;
        $path = '/files/' . $name;

        $image->crop(
            (int)$request->width,
            (int)$request->height,
            (int)$request->left,
            (int)$request->top
        );

        $image->save(public_path() . $path);
        $model->image = $path;

        return $model;
    }

    public function addVideo($model, $request)
    {
        $video = $request->file('video');
        $extension = $video->getClientOriginalExtension();
        $name = time() . '.' . $extension;
        $video->move(public_path() . '/files/' . $name);
        $model->video = '/files/' . $name;

        return $model;
    }
}