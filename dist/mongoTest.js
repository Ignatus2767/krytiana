"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const uri = "mongodb+srv://learnroom:yourActualPassword@cluster0.b5qgu.mongodb.net/?retryWrites=true&w=majority";
const client = new mongodb_1.MongoClient(uri);
function testConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            console.log("✅ Connected to MongoDB Atlas!");
        }
        catch (error) {
            console.error("❌ Connection failed:", error);
        }
        finally {
            yield client.close();
        }
    });
}
testConnection();
//# sourceMappingURL=mongoTest.js.map