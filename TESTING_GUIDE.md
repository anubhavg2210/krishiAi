# 🧪 KRISHI AI - TESTING GUIDE

## Manual Testing Checklist

Follow these steps to thoroughly test Krishi AI before production deployment.

---

## **PART 1: Frontend Testing**

### 1.1 Landing Page
- [ ] Page loads without errors
- [ ] All feature cards are visible
- [ ] Images load properly
- [ ] Buttons are clickable and have hover effects
- [ ] Text is readable and properly formatted
- [ ] Responsive on mobile (375px width)
- [ ] Responsive on tablet (768px width)
- [ ] Responsive on desktop (1024px+ width)

### 1.2 Crop Suggestion Page (`/suggest`)
- [ ] Page loads
- [ ] District dropdown works
- [ ] Can select different districts
- [ ] Weather data loads after district selection
- [ ] All weather fields display properly:
  - [ ] Temperature
  - [ ] Humidity
  - [ ] Rainfall
  - [ ] Wind Speed
- [ ] Soil sliders work:
  - [ ] N (Nitrogen) slider: 0-100
  - [ ] P (Phosphorus) slider: 0-100
  - [ ] K (Potassium) slider: 0-100
  - [ ] pH slider: 4-9
- [ ] Form submit button is clickable
- [ ] Page navigates to `/results` on submit

### 1.3 Results Page (`/results`)
- [ ] Redirects to `/suggest` if no soil data
- [ ] Displays crop recommendation
- [ ] Shows match score
- [ ] Displays crop image
- [ ] Shows seed information
- [ ] Shows NPK requirements
- [ ] Shows irrigation schedule
- [ ] Shows yield expectation
- [ ] Shows mandi price with chart
- [ ] "Save Plan" button clickable
- [ ] "WhatsApp" button clickable
- [ ] "Try Different Inputs" link works

### 1.4 Disease Detection Page (`/disease`)
- [ ] Page loads
- [ ] File upload works:
  - [ ] Can select image files
  - [ ] Image preview displays
  - [ ] Shows image filename
- [ ] "Analyze Plant" button works
- [ ] Loading state shows while analyzing
- [ ] Results display after analysis:
  - [ ] Disease name
  - [ ] Confidence score
  - [ ] Symptoms list
  - [ ] Treatment steps
  - [ ] Prevention measures
- [ ] Error message for non-plant images

### 1.5 Weather Page (`/weather`)
- [ ] Page loads
- [ ] Can select different districts
- [ ] Current weather displays:
  - [ ] Temperature gauge
  - [ ] Humidity gauge
  - [ ] Wind compass with direction
  - [ ] Pressure indicator
  - [ ] UV index
- [ ] Air quality displays:
  - [ ] AQI score
  - [ ] PM2.5, PM10 values
  - [ ] NO₂, Ozone values
- [ ] Hourly forecast displays
- [ ] Refresh button works

### 1.6 Smart Timeline Page (`/timeline`)
- [ ] Page loads
- [ ] Crop stage dropdown works
- [ ] "Generate Timeline" button clickable
- [ ] Shows error if no soil data
- [ ] Generates timeline for each day:
  - [ ] Day name
  - [ ] Weather info
  - [ ] Risk level (Low/Medium/High)
  - [ ] Recommended action
- [ ] Shows alerts section if any
- [ ] Each alert shows:
  - [ ] Alert type
  - [ ] Message
  - [ ] Recommended action

### 1.7 Voice Assistant Page (`/assistant`)
- [ ] Page loads
- [ ] Voice input button appears
- [ ] Can ask questions
- [ ] Assistant responds with text
- [ ] Assistant speaks response (audio)
- [ ] Chat history displays
- [ ] Quick action buttons work:
  - [ ] "Check Weather" → navigates to `/weather`
  - [ ] "Crop Suggestion" → navigates to `/suggest`
  - [ ] "Disease Detection" → navigates to `/disease`

### 1.8 Navigation
- [ ] Navbar visible on all pages
- [ ] All links in navbar work
- [ ] Active page highlighted in navbar
- [ ] Language dropdown works
- [ ] Mobile menu opens/closes
- [ ] Mobile menu links work
- [ ] Logo link goes to home
- [ ] Footer visible on all pages

### 1.9 Responsive Design
Mobile (375px):
- [ ] All content visible (no horizontal scroll)
- [ ] Buttons are tap-friendly (> 44px)
- [ ] Text is readable (> 12px)
- [ ] Images scale properly

Tablet (768px):
- [ ] Grid layouts adapt
- [ ] Cards display 2 per row
- [ ] Touch targets remain large

Desktop (1920px):
- [ ] Layouts use full width efficiently
- [ ] Maximum content width enforced
- [ ] Spacing looks balanced

---

## **PART 2: Backend API Testing**

### 2.1 Test Health Endpoint
```bash
curl http://localhost:8000/
# Expected: {"message": "Backend Running"}
```

### 2.2 Test Disease Analysis Endpoint

**Prepare a test image:**
- Get any leaf/plant image (JPG or PNG)
- Save as `test_image.jpg`

**Test with curl:**
```bash
curl -X POST \
  -F "file=@test_image.jpg" \
  http://localhost:8000/analyze

# Expected response:
# {
#   "disease": "Early Blight",
#   "confidence": 0.78,
#   "weather": "normal",
#   "symptoms": [...],
#   "treatment": [...],
#   "prevention": [...]
# }
```

**Test error handling:**
```bash
# Test with non-image file
curl -X POST \
  -F "file=@document.pdf" \
  http://localhost:8000/analyze

# Expected: 400 error "This is not a plant image"
```

### 2.3 Test Smart Timeline Endpoint

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "stage": "vegetative",
    "weather_data": [
      {
        "day": "Monday",
        "weather": "Sunny",
        "temperature": 32,
        "humidity": 65,
        "rain_probability": 10
      }
    ],
    "soil": {
      "moisture": 50,
      "nitrogen": "normal"
    }
  }' \
  http://localhost:8000/smart-timeline

# Expected: timeline and alerts array
```

### 2.4 Test CORS Headers

```bash
curl -H "Origin: http://localhost:5173" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type" \
  -X OPTIONS \
  http://localhost:8000/analyze \
  -v

# Should see CORS headers in response:
# Access-Control-Allow-Origin: http://localhost:5173
# Access-Control-Allow-Methods: GET, POST, ...
```

---

## **PART 3: Integration Testing**

### 3.1 Full Flow: Crop Suggestion
1. [ ] Visit `/suggest`
2. [ ] Select district "Indore"
3. [ ] Verify weather data loads
4. [ ] Adjust soil sliders:
   - N: 80
   - P: 60
   - K: 40
   - pH: 6.5
5. [ ] Click "Continue"
6. [ ] Verify `/results` page shows crop recommendation
7. [ ] Verify all details display

### 3.2 Full Flow: Disease Detection
1. [ ] Visit `/disease`
2. [ ] Upload plant/leaf image
3. [ ] Verify preview shows
4. [ ] Click "Analyze Plant"
5. [ ] Verify results show within 5 seconds
6. [ ] Verify all sections populated:
   - Disease name
   - Symptoms
   - Treatment
   - Prevention

### 3.3 Full Flow: Weather & Timeline
1. [ ] Visit `/weather`
2. [ ] Verify current weather displays
3. [ ] Change district
4. [ ] Verify weather updates
5. [ ] Go to `/suggest` and set soil data
6. [ ] Visit `/timeline`
7. [ ] Select crop stage
8. [ ] Generate timeline
9. [ ] Verify results show

### 3.4 Full Flow: Voice Assistant
1. [ ] Visit `/assistant`
2. [ ] Click microphone button
3. [ ] Say: "What's the current weather?"
4. [ ] Verify assistant responds
5. [ ] Verify voice plays
6. [ ] Try quick action buttons

---

## **PART 4: Error Handling Testing**

### 4.1 Network Errors
- [ ] Backend offline → Show helpful error message
- [ ] No internet → Show offline message
- [ ] Slow network → Show timeout message

### 4.2 Input Validation
- [ ] Invalid crop stage → Handle gracefully
- [ ] Extreme soil values → Accept or show warning
- [ ] Non-image file upload → Reject with message
- [ ] Very large image → Show size warning

### 4.3 API Errors
- [ ] 400 Bad Request → Show error message
- [ ] 500 Server Error → Show error message
- [ ] 503 Service Unavailable → Show retry option
- [ ] CORS error → Indicate backend URL issue

---

## **PART 5: Performance Testing**

### 5.1 Load Times
- [ ] Homepage loads in < 2 seconds
- [ ] Each page loads in < 3 seconds
- [ ] API responds in < 2 seconds
- [ ] Image analysis completes in < 5 seconds

### 5.2 Resource Usage
- [ ] No memory leaks (check with DevTools)
- [ ] No 404 errors in console
- [ ] Bundle size < 1MB (gzipped)
- [ ] No duplicate requests

### 5.3 Mobile Performance
- [ ] Loads on 3G network in < 5 seconds
- [ ] Touch responses instant (no lag)
- [ ] Smooth scrolling
- [ ] No jank or stuttering

---

## **PART 6: Browser Compatibility**

Test on:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Chrome
- [ ] Mobile Safari

**Each browser should:**
- [ ] Load without errors
- [ ] Display all elements correctly
- [ ] Have working interactions
- [ ] Support voice (if applicable)

---

## **PART 7: Accessibility Testing**

- [ ] Can navigate with keyboard only
- [ ] Form labels associated with inputs
- [ ] Color contrast meets WCAG AA
- [ ] Images have alt text
- [ ] Error messages announce clearly
- [ ] Focus indicators visible

---

## **PART 8: Security Testing**

- [ ] No API keys visible in frontend code
- [ ] No hardcoded credentials
- [ ] File upload validates file type
- [ ] XSS attempts blocked
- [ ] CSRF protection in place
- [ ] Input sanitized

---

## **Automated Testing Commands**

```bash
# Lint frontend code
cd frontend && npm run lint

# Check for security vulnerabilities
npm audit

# Check backend with flake8
cd backend && pip install flake8 && flake8 .

# Type checking (if using TypeScript)
# npm run type-check
```

---

## **Testing Report Template**

```
Date: _________
Tester: _________

✅ Passed: ___/150 tests
⚠️  Issues Found: ___
❌ Failed: ___

Critical Issues:
- [ ] List any show-stoppers

Non-Critical Issues:
- [ ] List improvements

Performance:
- Homepage load: ___ ms
- API response: ___ ms
- Image analysis: ___ ms

Browser Tested: _________
Mobile Device: _________

Recommendation: ☐ Ready for Production  ☐ Fix Issues First
```

---

## **Done!** ✅

If all tests pass, your app is ready for production! 🚀
