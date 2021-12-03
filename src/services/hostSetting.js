var url = '';
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    url = "http://ant.indiapromise.ooo";
} else {
    url = "http://ant.indiapromise.ooo";
}

export const API_BASE_URL = url;
