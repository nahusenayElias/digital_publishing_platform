<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "name" => "required|string|max:255",
            "email" => "required|string|email|max:255|unique:users",
            "password" => ["required", "confirmed", Password::defaults()],
        ]);

        if ($validator->fails()) {
            return response()->json([
                "message" => "Validation failed",
                "errors" => $validator->errors()
            ], 422);
        }

        $user = User::create([
            "name" => $request->name,
            "email" => $request->email,
            "password" => Hash::make($request->password),
        ]);

        $token = $user->createToken("auth_token")->plainTextToken;

        return response()->json([
            "message" => "Registration successful",
            "user" => [
                "id" => $user->id,
                "name" => $user->name,
                "email" => $user->email,
                "is_admin" => $user->isAdmin(),
                "created_at" => $user->created_at
            ],
            "token" => $token
        ], 201);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "email" => "required|email",
            "password" => "required",
        ]);

        if ($validator->fails()) {
            return response()->json([
                "message" => "Validation failed",
                "errors" => $validator->errors()
            ], 422);
        }

        $user = User::where("email", $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                "message" => "The provided credentials are incorrect."
            ], 401);
        }

        $token = $user->createToken("auth_token")->plainTextToken;

        return response()->json([
            "message" => "Login successful",
            "user" => [
                "id" => $user->id,
                "name" => $user->name,
                "email" => $user->email,
                "is_admin" => $user->isAdmin(),
                "created_at" => $user->created_at
            ],
            "token" => $token
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            "message" => "Logged out successfully"
        ]);
    }

    public function me(Request $request)
    {
        $user = $request->user();
        
        return response()->json([
            "user" => [
                "id" => $user->id,
                "name" => $user->name,
                "email" => $user->email,
                "is_admin" => $user->isAdmin(),
                "created_at" => $user->created_at,
                "updated_at" => $user->updated_at
            ]
        ]);
    }
}
