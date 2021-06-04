"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
// @ts-ignore
const fetch = require("node-fetch");
// @ts-ignore
const headers_1 = require("headers");
const { API_BASE = '', API_USER = '', API_PASS = '' } = process.env;
async function handler(event) {
    var response = {
        body: '',
        statusCode: 400,
        headers: headers_1.default.response
    };
    try {
        const result = await getSSOLink(event.pathParameters.userId, event.pathParameters.siteName);
        response.statusCode = result.statusCode;
        if (result.error) {
            result.statusCode == 403 ? response.body = JSON.stringify({
                "error": "Duda API responded with error.",
                "description": "Unable to authenticate with the Duda API"
            }) : response.body = JSON.stringify({
                "error": "Duda API responded with error.",
                "description": JSON.stringify(result.message)
            });
        }
        else {
            response.body = JSON.stringify({
                "url": result.url
            });
        }
    }
    catch (e) {
        response.body = JSON.stringify({
            "error": `Problem handling ${event.httpMethod} on resource ${event.resource}`,
            "description": e
        });
    }
    return response;
}
exports.handler = handler;
const getSSOLink = async function (userId, siteName) {
    const url = `${API_BASE}/accounts/sso/${userId}/link?target=EDITOR&site_name=${siteName}`;
    const options = {
        method: 'GET',
        headers: headers_1.default.request(API_USER, API_PASS)
    };
    const response = await fetch(url, options);
    if (response.error) {
        var result = {
            statusCode: 500,
            error: true,
            message: ''
        };
        result.statusCode = response.statusCode;
        result.error = response.error;
        const error = await response.json();
        result.message = error.message;
        return result;
    }
    else {
        return await response.json();
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxhQUFhO0FBQ2Isb0NBQW1DO0FBQ25DLGFBQWE7QUFDYixxQ0FBNkI7QUFDN0IsTUFBTSxFQUFFLFFBQVEsR0FBRyxFQUFFLEVBQUUsUUFBUSxHQUFHLEVBQUUsRUFBRSxRQUFRLEdBQUcsRUFBRSxFQUFFLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQTtBQUU1RCxLQUFLLFVBQVUsT0FBTyxDQUFDLEtBQVU7SUFFdEMsSUFBSSxRQUFRLEdBQUc7UUFDYixJQUFJLEVBQUUsRUFBRTtRQUNSLFVBQVUsRUFBRSxHQUFHO1FBQ2YsT0FBTyxFQUFFLGlCQUFPLENBQUMsUUFBUTtLQUMxQixDQUFBO0lBRUQsSUFBSTtRQUVGLE1BQU0sTUFBTSxHQUFHLE1BQU0sVUFBVSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDM0YsUUFBUSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFBO1FBRXZDLElBQUksTUFBTSxDQUFDLEtBQUssRUFBRTtZQUNoQixNQUFNLENBQUMsVUFBVSxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO2dCQUN4RCxPQUFPLEVBQUUsZ0NBQWdDO2dCQUN6QyxhQUFhLEVBQUUsMENBQTBDO2FBQzFELENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO2dCQUNsQyxPQUFPLEVBQUUsZ0NBQWdDO2dCQUN6QyxhQUFhLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDO2FBQzlDLENBQUMsQ0FBQTtTQUNIO2FBQU07WUFDTCxRQUFRLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7Z0JBQzdCLEtBQUssRUFBRSxNQUFNLENBQUMsR0FBRzthQUNsQixDQUFDLENBQUE7U0FDSDtLQUVGO0lBQUMsT0FBTSxDQUFDLEVBQUU7UUFFVCxRQUFRLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDN0IsT0FBTyxFQUFFLG9CQUFvQixLQUFLLENBQUMsVUFBVSxnQkFBZ0IsS0FBSyxDQUFDLFFBQVEsRUFBRTtZQUM3RSxhQUFhLEVBQUUsQ0FBQztTQUNqQixDQUFDLENBQUE7S0FFSDtJQUVELE9BQU8sUUFBUSxDQUFBO0FBRWpCLENBQUM7QUF0Q0QsMEJBc0NDO0FBRUQsTUFBTSxVQUFVLEdBQUcsS0FBSyxXQUFVLE1BQVcsRUFBRSxRQUFhO0lBRXhELE1BQU0sR0FBRyxHQUFHLEdBQUcsUUFBUSxpQkFBaUIsTUFBTSxpQ0FBaUMsUUFBUSxFQUFFLENBQUE7SUFFekYsTUFBTSxPQUFPLEdBQUc7UUFDZCxNQUFNLEVBQUUsS0FBSztRQUNiLE9BQU8sRUFBRSxpQkFBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDO0tBQzdDLENBQUE7SUFFRCxNQUFNLFFBQVEsR0FBRyxNQUFNLEtBQUssQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUE7SUFDMUMsSUFBSSxRQUFRLENBQUMsS0FBSyxFQUFFO1FBRWxCLElBQUksTUFBTSxHQUFHO1lBQ1gsVUFBVSxFQUFFLEdBQUc7WUFDZixLQUFLLEVBQUUsSUFBSTtZQUNYLE9BQU8sRUFBRSxFQUFFO1NBQ1osQ0FBQTtRQUVELE1BQU0sQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQTtRQUN2QyxNQUFNLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUE7UUFDN0IsTUFBTSxLQUFLLEdBQUcsTUFBTSxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUE7UUFDbkMsTUFBTSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFBO1FBRTlCLE9BQU8sTUFBTSxDQUFBO0tBRWQ7U0FBTTtRQUVMLE9BQU8sTUFBTSxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUE7S0FFN0I7QUFFTCxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBAdHMtaWdub3JlXG5pbXBvcnQgKiBhcyBmZXRjaCBmcm9tICdub2RlLWZldGNoJ1xuLy8gQHRzLWlnbm9yZVxuaW1wb3J0IGhlYWRlcnMgZnJvbSAnaGVhZGVycydcbmNvbnN0IHsgQVBJX0JBU0UgPSAnJywgQVBJX1VTRVIgPSAnJywgQVBJX1BBU1MgPSAnJyB9ID0gcHJvY2Vzcy5lbnZcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGhhbmRsZXIoZXZlbnQ6IGFueSkge1xuXG4gIHZhciByZXNwb25zZSA9IHtcbiAgICBib2R5OiAnJyxcbiAgICBzdGF0dXNDb2RlOiA0MDAsXG4gICAgaGVhZGVyczogaGVhZGVycy5yZXNwb25zZVxuICB9XG5cbiAgdHJ5IHtcblxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGdldFNTT0xpbmsoZXZlbnQucGF0aFBhcmFtZXRlcnMudXNlcklkLCBldmVudC5wYXRoUGFyYW1ldGVycy5zaXRlTmFtZSlcbiAgICByZXNwb25zZS5zdGF0dXNDb2RlID0gcmVzdWx0LnN0YXR1c0NvZGVcblxuICAgIGlmIChyZXN1bHQuZXJyb3IpIHtcbiAgICAgIHJlc3VsdC5zdGF0dXNDb2RlID09IDQwMyA/IHJlc3BvbnNlLmJvZHkgPSBKU09OLnN0cmluZ2lmeSh7IFxuICAgICAgICBcImVycm9yXCI6IFwiRHVkYSBBUEkgcmVzcG9uZGVkIHdpdGggZXJyb3IuXCIsXG4gICAgICAgIFwiZGVzY3JpcHRpb25cIjogXCJVbmFibGUgdG8gYXV0aGVudGljYXRlIHdpdGggdGhlIER1ZGEgQVBJXCIgXG4gICAgICB9KSA6IHJlc3BvbnNlLmJvZHkgPSBKU09OLnN0cmluZ2lmeSh7IFxuICAgICAgICBcImVycm9yXCI6IFwiRHVkYSBBUEkgcmVzcG9uZGVkIHdpdGggZXJyb3IuXCIsXG4gICAgICAgIFwiZGVzY3JpcHRpb25cIjogSlNPTi5zdHJpbmdpZnkocmVzdWx0Lm1lc3NhZ2UpICBcbiAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3BvbnNlLmJvZHkgPSBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIFwidXJsXCI6IHJlc3VsdC51cmxcbiAgICAgIH0pXG4gICAgfVxuXG4gIH0gY2F0Y2goZSkge1xuXG4gICAgcmVzcG9uc2UuYm9keSA9IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgIFwiZXJyb3JcIjogYFByb2JsZW0gaGFuZGxpbmcgJHtldmVudC5odHRwTWV0aG9kfSBvbiByZXNvdXJjZSAke2V2ZW50LnJlc291cmNlfWAsXG4gICAgICBcImRlc2NyaXB0aW9uXCI6IGVcbiAgICB9KVxuXG4gIH1cblxuICByZXR1cm4gcmVzcG9uc2VcblxufVxuXG5jb25zdCBnZXRTU09MaW5rID0gYXN5bmMgZnVuY3Rpb24odXNlcklkOiBhbnksIHNpdGVOYW1lOiBhbnkpIHtcblxuICAgIGNvbnN0IHVybCA9IGAke0FQSV9CQVNFfS9hY2NvdW50cy9zc28vJHt1c2VySWR9L2xpbms/dGFyZ2V0PUVESVRPUiZzaXRlX25hbWU9JHtzaXRlTmFtZX1gXG5cbiAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIGhlYWRlcnM6IGhlYWRlcnMucmVxdWVzdChBUElfVVNFUiwgQVBJX1BBU1MpXG4gICAgfVxuXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIG9wdGlvbnMpXG4gICAgaWYgKHJlc3BvbnNlLmVycm9yKSB7XG4gICAgICBcbiAgICAgIHZhciByZXN1bHQgPSB7XG4gICAgICAgIHN0YXR1c0NvZGU6IDUwMCxcbiAgICAgICAgZXJyb3I6IHRydWUsXG4gICAgICAgIG1lc3NhZ2U6ICcnXG4gICAgICB9XG4gIFxuICAgICAgcmVzdWx0LnN0YXR1c0NvZGUgPSByZXNwb25zZS5zdGF0dXNDb2RlXG4gICAgICByZXN1bHQuZXJyb3IgPSByZXNwb25zZS5lcnJvclxuICAgICAgY29uc3QgZXJyb3IgPSBhd2FpdCByZXNwb25zZS5qc29uKClcbiAgICAgIHJlc3VsdC5tZXNzYWdlID0gZXJyb3IubWVzc2FnZVxuICBcbiAgICAgIHJldHVybiByZXN1bHRcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIHJldHVybiBhd2FpdCByZXNwb25zZS5qc29uKClcblxuICAgIH1cblxufVxuIl19